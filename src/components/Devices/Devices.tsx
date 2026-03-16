import css from "./Devices.module.css";
import Icon from "../Icon/Icon";

export default function Devices() {
  return (
    <div className={css.container}>
      <h2 className={css.title}>
        We Provide you streaming experience across various devices.
      </h2>
      <p className={css.text}>
        With StreamVibe, you can enjoy your favorite movies and TV shows
        anytime, anywhere.
      </p>
      <ul className={css.devices}>
        <li className={css.device}>
          <div className={css.up}>
            <div className={css.icon}>
            <Icon name="phone" width={24} height={24} />
            </div>
            <p className={css.name}>Smartphones</p>
          </div>
          <p className={css.text}>
            StreamVibe is optimized for both Android and iOS smartphones.
            Download our app from the Google Play Store or the Apple App Store
          </p>
        </li>
        <li className={css.device}>
          <div className={css.up}>
                        <div className={css.icon}>
            <Icon name="tablet" width={24} height={24} />
            </div>
            <p className={css.name}>Tablet</p>
          </div>
          <p className={css.text}>
            StreamVibe is optimized for both Android and iOS smartphones.
            Download our app from the Google Play Store or the Apple App Store
          </p>
        </li>
        <li className={css.device}>
          <div className={css.up}>
                        <div className={css.icon}>
            <Icon name="tv" width={24} height={24} />
            </div>
            <p className={css.name}>Smart TV</p>
          </div>
          <p className={css.text}>
            StreamVibe is optimized for both Android and iOS smartphones.
            Download our app from the Google Play Store or the Apple App Store
          </p>
        </li>
        <li className={css.device}>
          <div className={css.up}>
                        <div className={css.icon}>
            <Icon name="laptop" width={24} height={24} />
            </div>
            <p className={css.name}>Laptops</p>
          </div>
          <p className={css.text}>
            StreamVibe is optimized for both Android and iOS smartphones.
            Download our app from the Google Play Store or the Apple App Store
          </p>
        </li>
        <li className={css.device}>
          <div className={css.up}>
                        <div className={css.icon}>
            <Icon name="game" width={24} height={24} />
            </div>
            <p className={css.name}>Gaming Console</p>
          </div>
          <p className={css.text}>
            StreamVibe is optimized for both Android and iOS smartphones.
            Download our app from the Google Play Store or the Apple App Store
          </p>
        </li>
        <li className={css.device}>
          <div className={css.up}>
                        <div className={css.icon}>
            <Icon name="glasses" width={24} height={24} />
            </div>
            <p className={css.name}>VR Headsets</p>
          </div>
          <p className={css.text}>
            StreamVibe is optimized for both Android and iOS smartphones.
            Download our app from the Google Play Store or the Apple App Store
          </p>
        </li>
      </ul>
    </div>
  );
}
