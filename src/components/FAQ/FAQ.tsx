"use client";
import * as Accordion from "@radix-ui/react-accordion";
import css from "./FAQ.module.css";
import Icon from "../Icon/Icon";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What is StreamVibe?",
    answer:
      "StreamVibe is a streaming service that allows you to watch movies and shows on demand, anytime, anywhere. Enjoy unlimited access to thousands of titles across all genres, from classic favorites to the latest releases, all in stunning HD quality.",
  },
  {
    id: "2",
    question: "How much does StreamVibe cost?",
    answer:
      "StreamVibe offers flexible pricing plans to suit your needs. Our Basic plan starts at $9.99/month with HD streaming on one device. The Standard plan is $13.99/month with Full HD on two devices simultaneously. Our Premium plan at $17.99/month includes 4K Ultra HD streaming on up to four devices at once. All plans include a 30-day free trial with no commitment.",
  },
  {
    id: "3",
    question: "What content is available on StreamVibe?",
    answer:
      "StreamVibe offers an extensive library of over 10,000 movies and TV shows spanning all genres including action, comedy, drama, horror, documentaries, and family entertainment. We feature exclusive original content, blockbuster movies, award-winning series, and international films. New titles are added weekly to keep your entertainment fresh and exciting.",
  },
  {
    id: "4",
    question: "How can I watch StreamVibe?",
    answer:
      "You can watch StreamVibe on virtually any device with an internet connection. This includes smart TVs, streaming devices (Roku, Apple TV, Chromecast, Fire TV), gaming consoles (PlayStation, Xbox), smartphones and tablets (iOS and Android), and web browsers on your computer. Simply download our app or visit streamvibe.com to start streaming.",
  },
  {
    id: "5",
    question: "How do I sign up for StreamVibe?",
    answer:
      "Signing up is easy! Visit streamvibe.com and click 'Start Free Trial'. Choose your preferred plan, create an account with your email and password, and enter your payment information. Your free trial begins immediately, and you won't be charged until the trial period ends. You can cancel anytime before the trial ends with no charge.",
  },
  {
    id: "6",
    question: "What is the StreamVibe free trial?",
    answer:
      "The StreamVibe free trial gives you complete access to our entire content library for 30 days at no cost. You'll experience all the features of your chosen plan including unlimited streaming, multiple device support, and offline downloads. No credit card required to start. If you decide StreamVibe isn't for you, simply cancel before the trial ends and you won't be charged.",
  },
  {
    id: "7",
    question: "How do I contact StreamVibe customer support?",
    answer:
      "Our dedicated support team is available 24/7 to assist you. You can reach us instantly via the Live Chat feature on our website and mobile app, or by emailing support@streamvibe.com. For quick answers to common technical issues, visit our comprehensive Help Center and community forums.",
  },
  {
    id: "8",
    question: "What are the StreamVibe payment methods?",
    answer:
      "StreamVibe supports a wide range of secure payment options for your convenience. We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, and digital wallets like Apple Pay and Google Pay. In select regions, we also offer support for local payment providers and prepaid subscription cards.",
  },
];

export default function FAQ() {
  return (
    <div className={css.container} id="faq">
      <h2 className={css.title}>Frequently Asked Questions</h2>
      <p className={css.text}>
        Got questions? We`ve got answers! Check out our FAQ section to find
        answers to the most common questions about StreamVibe.
      </p>

      <Accordion.Root
        className={css.acc}
        type="single"
        defaultValue="1"
        collapsible
      >
        {faqData.map((item, i) => {
          return (
            <Accordion.Item key={item.id} className={css.item} value={item.id}>
              <Accordion.Header className={css.header}>
                <Accordion.Trigger className={css.trigger}>
                  <div className={css.question}>
                    <span className={css.number}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className={css.q}>{item.question}</p>
                  </div>
                  <div className={css.icon}>
                    <Icon name="plus" className={css.plus} width={24} height={24} />
                    <Icon name="-" className={css.minus} width={24} height={24} />
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className={css.content}>
                <div className={css.text}>{item.answer}</div>
              </Accordion.Content>

              <div className={css.divider}/>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}
