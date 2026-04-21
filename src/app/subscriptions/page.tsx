"use client";

import Plans from "@/components/Plans/Plans";
import css from "./page.module.css";
import { useUiStore } from "@/store/uiStore";

export default function SubscriptionsPage() {
  const plans = [
    {
      id: 1,
      name: "Basic",
      content:
        "Access to a wide selection of movies and shows, including some new releases.",
      price: "9.99",
      devices: "Watch on one device simultaneously",
      trial: "7 Days",
      cancel: "Yes",
      hdr: "No",
      dolby: "No",
      ad: "No",
      offline: "No",
      family: "No",
    },
    {
      id: 2,
      name: "Standard",
      content:
        "Access to a wider selection of movies and shows, including most new releases and exclusive content",
      price: "12.99",
      devices: "Watch on two device simultaneously",
      trial: "7 Days",
      cancel: "Yes",
      hdr: "Yes",
      dolby: "Yes",
      ad: "Yes",
      offline: "Yes, for select titles",
      family: "Yes, up to 5 family members",
    },
    {
      id: 3,
      name: "Premium",
      content:
        "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
      price: "14.99",
      devices: "Watch on four device simultaneously",
      trial: "7 Days",
      cancel: "Yes",
      hdr: "Yes",
      dolby: "Yes",
      ad: "Yes",
      offline: "Yes, for all titles",
      family: "Yes, up to 6 family members",
    },
  ];

  const activeTab = useUiStore((state) => state.planActiveTab);
  const setActiveTab = useUiStore((state) => state.setPlanActiveTab);

  const handleTabSwitch = (tab: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setActiveTab(tab as any);
  };

  return (
    <div className={css.containerr}>
      <Plans />
      <div className={css.content}>
        <h2 className={css.title}>
          Compare our plans and find the right one for you
        </h2>
        <p className={css.textt}>
          StreamVibe offers three different plans to fit your needs: Basic,
          Standard, and Premium. Compare the features of each plan and choose
          the one that`s right for you.
        </p>
        <div className={css.mobPlan}>
          <div className={css.switch}>
            <button
              onClick={() => handleTabSwitch("basic")}
              className={` ${css.btnn} ${activeTab === "basic" ? css.btnActive : ""}`}
            >
              Basic
            </button>
            <button
              onClick={() => handleTabSwitch("standard")}
              className={` ${css.btnn} ${activeTab === "standard" ? css.btnActive : ""}`}
            >
              Standard
            </button>
            <button
              onClick={() => handleTabSwitch("premium")}
              className={` ${css.btnn} ${activeTab === "premium" ? css.btnActive : ""}`}
            >
              Premium
            </button>
          </div>
          {activeTab === "basic" ? (
            <div className={css.plan}>
              <div className={css.above}>
                <div className={css.planContent}>
                  <h4 className={css.name}>Price</h4>
                  <p className={css.text}>${plans[0].price}/Month</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>Free Trial</h4>
                  <p className={css.text}>{plans[0].trial}</p>
                </div>
              </div>
              <div className={css.planContent}>
                <h4 className={css.name}>Content</h4>
                <p className={css.text}>{plans[0].content}</p>
              </div>
              <div className={css.planContent}>
                <h4 className={css.name}>Devices</h4>
                <p className={css.text}>{plans[0].devices}</p>
              </div>
              <div className={css.underneath}>
                <div className={css.planContent}>
                  <h4 className={css.name}>Cancel Anytime</h4>
                  <p className={css.text}>{plans[0].cancel}</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>HDR</h4>
                  <p className={css.text}>{plans[0].hdr}</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>Dolby Atmos</h4>
                  <p className={css.text}>{plans[0].dolby}</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>Ad-free</h4>
                  <p className={css.text}>{plans[0].ad}</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>Offline Viewing</h4>
                  <p className={css.text}>{plans[0].offline}</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>Family</h4>
                  <p className={css.text}>{plans[0].family}</p>
                </div>
              </div>
            </div>
          ) : activeTab === "standard" ? (
            <div className={css.plan}>
              <div className={css.above}>
                <div className={css.planContent}>
                  <h4 className={css.name}>Price</h4>
                  <p className={css.text}>${plans[1].price}/Month</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>Free Trial</h4>
                  <p className={css.text}>{plans[1].trial}</p>
                </div>
              </div>
              <div className={css.planContent}>
                <h4 className={css.name}>Content</h4>
                <p className={css.text}>{plans[1].content}</p>
              </div>
              <div className={css.planContent}>
                <h4 className={css.name}>Devices</h4>
                <p className={css.text}>{plans[1].devices}</p>
              </div>
              <div className={css.underneath}>
                <div className={css.planContent}>
                  <h4 className={css.name}>Cancel Anytime</h4>
                  <p className={css.text}>{plans[1].cancel}</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>HDR</h4>
                  <p className={css.text}>{plans[1].hdr}</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>Dolby Atmos</h4>
                  <p className={css.text}>{plans[1].dolby}</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>Ad-free</h4>
                  <p className={css.text}>{plans[1].ad}</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>Offline Viewing</h4>
                  <p className={css.text}>{plans[1].offline}</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>Family Sharing</h4>
                  <p className={css.text}>{plans[1].family}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={css.plan}>
              <div className={css.above}>
                <div className={css.planContent}>
                  <h4 className={css.name}>Price</h4>
                  <p className={css.text}>${plans[2].price}/Month</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>Free Trial</h4>
                  <p className={css.text}>{plans[2].trial}</p>
                </div>
              </div>
              <div className={css.planContent}>
                <h4 className={css.name}>Content</h4>
                <p className={css.text}>{plans[2].content}</p>
              </div>
              <div className={css.planContent}>
                <h4 className={css.name}>Devices</h4>
                <p className={css.text}>{plans[2].devices}</p>
              </div>
              <div className={css.underneath}>
                <div className={css.planContent}>
                  <h4 className={css.name}>Cancel Anytime</h4>
                  <p className={css.text}>{plans[2].cancel}</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>HDR</h4>
                  <p className={css.text}>{plans[2].hdr}</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>Dolby Atmos</h4>
                  <p className={css.text}>{plans[2].dolby}</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>Ad-free</h4>
                  <p className={css.text}>{plans[2].ad}</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>Offline Viewing</h4>
                  <p className={css.text}>{plans[2].offline}</p>
                </div>
                <div className={css.planContent}>
                  <h4 className={css.name}>Family</h4>
                  <p className={css.text}>{plans[2].family}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <table className={css.table}>
            <tr className={css.tableHeader}>
              <th className={css.tableTitle}>Features</th>
              <th className={css.tableTitle}>Basic</th>
              <th className={css.tableTitle}>Standard</th>
              <th className={css.tableTitle}>Premium</th>
            </tr>
            <tr className={css.tableRow}>
              <td className={css.tableText}>Price</td>
              <td className={css.tableText}>${plans[0].price}/Month</td>
              <td className={css.tableText}>${plans[1].price}/Month</td>
              <td className={css.tableText}>${plans[2].price}/Month</td>
            </tr>
            <tr className={css.tableRow}>
              <td className={css.tableText}>Content</td>
              <td className={css.tableText}>{plans[0].content}</td>
              <td className={css.tableText}>{plans[1].content}</td>
              <td className={css.tableText}>{plans[2].content}</td>
            </tr>
            <tr className={css.tableRow}>
              <td className={css.tableText}>Devices</td>
              <td className={css.tableText}>{plans[0].devices}</td>
              <td className={css.tableText}>{plans[1].devices}</td>
              <td className={css.tableText}>{plans[2].devices}</td>
            </tr>
            <tr className={css.tableRow}>
              <td className={css.tableText}>Free Trial</td>
              <td className={css.tableText}>{plans[0].trial}</td>
              <td className={css.tableText}>{plans[1].trial}</td>
              <td className={css.tableText}>{plans[2].trial}</td>
            </tr>
            <tr className={css.tableRow}>
              <td className={css.tableText}>Cancel Anytime</td>
              <td className={css.tableText}>{plans[0].cancel}</td>
              <td className={css.tableText}>{plans[1].cancel}</td>
              <td className={css.tableText}>{plans[2].cancel}</td>
            </tr>
            <tr className={css.tableRow}>
              <td className={css.tableText}>HDR</td>
              <td className={css.tableText}>{plans[0].hdr}</td>
              <td className={css.tableText}>{plans[1].hdr}</td>
              <td className={css.tableText}>{plans[2].hdr}</td>
            </tr>
            <tr className={css.tableRow}>
              <td className={css.tableText}>Dolby Atmos</td>
              <td className={css.tableText}>{plans[0].dolby}</td>
              <td className={css.tableText}>{plans[1].dolby}</td>
              <td className={css.tableText}>{plans[2].dolby}</td>
            </tr>
            <tr className={css.tableRow}>
              <td className={css.tableText}>Ad-free</td>
              <td className={css.tableText}>{plans[0].ad}</td>
              <td className={css.tableText}>{plans[1].ad}</td>
              <td className={css.tableText}>{plans[2].ad}</td>
            </tr>
            <tr className={css.tableRow}>
              <td className={css.tableText}>Offline Viewing</td>
              <td className={css.tableText}>{plans[0].offline}</td>
              <td className={css.tableText}>{plans[1].offline}</td>
              <td className={css.tableText}>{plans[2].offline}</td>
            </tr>
            <tr className={css.tableRow}>
              <td className={css.tableText}>Family Sharing</td>
              <td className={css.tableText}>{plans[0].family}</td>
              <td className={css.tableText}>{plans[1].family}</td>
              <td className={css.tableText}>{plans[2].family}</td>
            </tr>
        </table>
      </div>
    </div>
  );
}
