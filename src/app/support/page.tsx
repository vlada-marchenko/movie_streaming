/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FAQ from "@/components/FAQ/FAQ";
import css from "./page.module.css";
import { useUiStore } from "@/store/uiStore";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "@/lib/movies";
import { getPopularSeries } from "@/lib/series";
import { tmdbPosterSrc } from "@/lib/tmdbImage";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
.matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .required("Phone number is required"),
  message: yup.string().required("Message is required"),
  acceptPrivacy: yup
    .boolean()
    .oneOf([true], "You must accept the privacy policy")
    .required("You must accept the privacy policy"),
});

export default function SupportPage() {
  const gridSize = useUiStore((state) => state.trialGridSize);
  const setTrialGridSize = useUiStore((state) => state.setTrialGridSize);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTrialGridSize(12);
      } else if (window.innerWidth < 1440) {
        setTrialGridSize(28);
      } else if (window.innerWidth < 1920) {
        setTrialGridSize(15);
      } else {
        setTrialGridSize(28);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setTrialGridSize]);

  const { data: moviesData } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: async () => {
      const [page1, page2] = await Promise.all([
        getPopularMovies(1),
        getPopularMovies(2),
      ]);
      return {
        results: [...(page1?.results || []), ...(page2?.results || [])],
      };
    },
  });

  const { data: tvData } = useQuery({
    queryKey: ["popularTVShows"],
    queryFn: async () => {
      const [page1, page2] = await Promise.all([
        getPopularSeries(1),
        getPopularSeries(2),
      ]);
      return {
        results: [...(page1?.results || []), ...(page2?.results || [])],
      };
    },
  });

  const movies = moviesData?.results || [];
  const tvShows = tvData?.results || [];

  const allContent = [...movies, ...tvShows].filter((item) => item.poster_path);

  const shuffled = allContent.sort(() => Math.random() - 0.5);

  const gridContent = shuffled.slice(0, gridSize);

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any,
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", values);

      alert("Thank you! Your message has been sent successfully.");

      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className={css.containerr}>
      <div className={css.content}>
        <div className={css.intro}>
          <h1 className={css.title}>Welcome to our support page!</h1>
          <p className={css.text}>
            We are here to help you with any problems you may be having with our
            product.
          </p>
          <div className={css.container}>
            <div className={css.grid}>
              {gridContent.map((item, index) => (
                <div key={`${item.id}-${index}`} className={css.gridItem}>
                  <Image
                    src={tmdbPosterSrc(item.poster_path)}
                    alt={item.title || item.name || ""}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1440px) 20vw, 15vw"
                    className={css.poster}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={css.form}>
          <div className={css.formik}>
          <Formik
            initialValues={{
              name: "",
              surname: "",
              email: "",
              phone: "",
              message: "",
              acceptPrivacy: false,
            }}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            <Form className={css.formContainer}>
              <div className={css.formGroup}>
                <label className={css.label} htmlFor="name">
                  First Name
                </label>
                <Field
                  name="name"
                  key="name"
                  type="text"
                  className={css.input}
                  placeholder="Enter First Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor="surname" className={css.label}>
                  Last Name
                </label>
                <Field
                  name="surname"
                  key="surname"
                  type="text"
                  className={css.input}
                  placeholder="Enter Last Name"
                />
                <ErrorMessage
                  name="surname"
                  component="div"
                  className={css.error}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor="email" className={css.label}>Email</label>
                <Field
                  name="email"
                  key="email"
                  type="email"
                  className={css.input}
                  placeholder="Enter Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor="phone" className={css.label}>
                  Phone Number
                </label>
                <Field
                  name="phone"
                  key="phone"
                  type="text"
                  placeholder="Enter Phone Number"
                >
                  {({ field, form }: any) => (
                    <PhoneInput
                      defaultCountry="us"
                      value={field.value}
                      inputClassName={`${css.input} ${form.errors.phone && form.touched.phone ? css.inputError : ""}`}
                      className={css.phoneInputWrapper}
                      onChange={(phone) => form.setFieldValue("phone", phone)}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className={css.error}
                />
              </div>
              <div className={css.formGroup}>
                <label className={css.label} htmlFor="message">
                  Message
                </label>
                <Field
                  name="message"
                  key="message"
                  as="textarea"
                  className={css.inputMessage}
                  rows={5}
                  placeholder="Enter Message"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className={css.error}
                />
              </div>
              <div className={css.checkboxGroup}>
                <label className={css.checkboxLabel}>
                  <Field type="checkbox" name="acceptPrivacy" className={css.checkbox} />
                  <span>I accept the Privacy Policy and Terms of Service</span>
                </label>
                <ErrorMessage
                  name="acceptPrivacy"
                  component="div"
                  className={css.errorCheckbox}
                />
              </div>
              <button type="submit" className={css.submit}>
                Send Message
              </button>
            </Form>
          </Formik>
          </div>
        </div>
      </div>

      <FAQ />
    </div>
  );
}
