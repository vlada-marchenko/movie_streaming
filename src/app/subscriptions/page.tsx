import Plans from "@/components/Plans/Plans";
import css from "./page.module.css";

export default function SubscriptionsPage() {
      const plans = [
        {
            id: 1,
            name: 'Basic',
            content: 'Access to a wide selection of movies and shows, including some new releases.',
            price: '9.99',
            devices: 'Watch on one device simultaneously',
            trial: '7 Days',
            cancel: 'Yes',
            hdr: 'No',
            dolby: 'No',
            ad: 'No',
            offline: 'No',
            family: 'No'
        },
        {
            id: 2,
            name: 'Standard',
            content: 'Access to a wider selection of movies and shows, including most new releases and exclusive content',
            price: '12.99',
            devices: 'Watch on two device simultaneously',
            trial: '7 Days',
            cancel: 'Yes',
            hdr: 'Yes',
            dolby: 'Yes',
            ad: 'Yes',
            offline: 'Yes, for select titles',
            family: 'Yes, up to 5 family members'
        },
        {
            id: 3,
            name: 'Premium',
            content: 'Access to a widest selection of movies and shows, including all new releases and Offline Viewing',
            price: '14.99',
            devices: 'Watch on four device simultaneously',
            trial: '7 Days',
            cancel: 'Yes',
            hdr: 'Yes',
            dolby: 'Yes',
            ad: 'Yes',
            offline: 'Yes, for all titles',
            family: 'Yes, up to 6 family members'
        }
    ]
  return (
    <div className={css.containerr}>
      <Plans />
      <div className={css.content}>
        <h2 className={css.title}>Compare our plans and find the right one for you</h2>
        <p className={css.text}>StreamVibe offers three different plans to fit your needs: Basic, Standard, and Premium. Compare the features of each plan and choose the one that`s right for you.</p>
      </div>
    </div>
  );
}