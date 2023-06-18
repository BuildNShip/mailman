import React from "react";
import styles from "./HelpPage.module.css";
import { FaInstagram, FaTwitter, FaGithub, FaTelegram } from "react-icons/fa";

const HelpPage = ({ setViewHelp, setViewReport }) => {
  return (
    <div className={styles.background_container}>
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.navbar}>
              <div className={styles.logo}>
                <p>MAiL - MAN</p>
              </div>
              <iframe
                src="https://ghbtns.com/github-btn.html?user=BuildNShip&repo=mailman-frontend&type=star&count=true&size=large"
                width="170"
                height="30"
                title="GitHub"
              ></iframe>
            </div>
            <div className={styles.help_container}>
              <div className={styles.help}>
                <p className={styles.help_heading}>
                  Step 1: Filling in the Credentials
                </p>
                <p className={styles.help_content}>
                  Fill in the credentials of the email account you want to use
                  to send the emails. For Password you can use your actual
                  password or you can{" "}
                  <span>use the app password if you have 2FA enabled.</span>{" "}
                  Also make sure that you{" "}
                  <span>
                    change the password of the email account after you are done
                    sending the emails.
                  </span>
                </p>
              </div>
              <div className={styles.help}>
                <p className={styles.help_heading}>Step 2: Filling the Data</p>
                <p className={styles.help_content}>
                  {" "}
                  The first row of the CSV file should be the column names. You
                  can download the sample CSV file by clicking on the download
                  button.{" "}
                  <span>
                    {" "}
                    The Mail Body can accept dynamic data. For example if you
                    want to add the name of the person in the mail body you can
                    use the format {"{{name}}"} and the name will be
                    automatically replaced by the name of the person.
                  </span>{" "}
                  You can also add multiple dynamic data in the mail body. For
                  example if you want to add the name and the email of the
                  person you can use the format {"{{name}} {{email}}"} and the
                  name and email will be automatically replaced by the name and
                  email
                </p>
              </div>
              <div className={styles.help}>
                <p className={styles.help_heading}>
                  Step 3: Uploading Attachments
                </p>
                <p className={styles.help_content}>
                  {" "}
                  You can upload attachments by clicking on the upload button.
                  <span>You can upload multiple attachments also.</span> Make
                  sure that the filename of the attachment is added in the CSV
                  file. For example if you want to add the attachment "test.pdf"
                  in the mail you can add the filename in the CSV file under the
                  header attachment1.{" "}
                  <span>
                    You can also add multiple attachments in the mail. For
                    example if you want to add the attachment "test.pdf" and
                    "test2.pdf" in the mail you can add the filename in the CSV
                    file under the header attachment1 and attachment2.
                  </span>
                </p>
              </div>
              <div className={styles.help}>
                <p className={styles.help_heading}>
                  Step 3: Sending the Mails and Reports
                </p>
                <p className={styles.help_content}>
                  You can send the mails by clicking on the send button.{" "}
                  <span>
                    Make sure to verify that the data shown in the confirmation
                    popup is correct.
                  </span>{" "}
                  Now the mails will be sent and you will be redirected to the
                  reports page. You can download the reports by clicking on the
                  download button.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setViewHelp(false);
                setViewReport(false);
              }}
              className={styles.sent_mail}
            >
              Go Back
            </button>
            <a
              href="https://www.youtube.com/watch?v=QvknPLwg7q8&t"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={styles.sent_mail}>Watch Video</button>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <a href="https://buildnship.in/">
          <img src="/BuildNShip.png" alt="logo" />
        </a>
        <div className={styles.social_container}>
          <a href="https://twitter.com/buildnship/">
            <FaTwitter size={25} />
          </a>
          <a href="https://instagram.com/buildnship?igshid=YmMyMTA2M2Y=">
            <FaInstagram size={25} />
          </a>
          <a href="https://github.com/BuildNShip">
            <FaGithub size={25} />
          </a>
          <a href="https://t.me/buildnship">
            <FaTelegram size={25} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
