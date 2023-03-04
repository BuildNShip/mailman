//React code to upload a file to the server from the user's computer
import React from "react";
import styles from "./FileUpload.module.css";

const FileUpload = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.first_view_container}>
        <div className={styles.fv_texts}>
          <p className={styles.fv_heading}>MailMan Mass Mailer</p>
          <p className={styles.fv_tagline}>
            Your go-to open source mail service for effortlessly sending group
            emails.
          </p>
        </div>
        <div className={styles.first_view}>

        <div className={styles.row}>
          <label className={styles.form_label} htmlFor="frommail">
            From Mail
          </label>
          <input className={styles.form_field} type="email" name="frommail" />
        </div>

        <div className={styles.row}>
          <label className={styles.form_label} htmlFor="appid">
            App ID
          </label>
          <input className={styles.form_field} type="text" name="appid" />
        </div>

        <div className={styles.row}>
          <label className={styles.form_label} htmlFor="textarea">
            Email Content
          </label>
          <textarea name="textarea" id=""></textarea>
        </div>

        <div className={styles.row}>
          <label className={styles.form_label} htmlFor="file">
            Choose a file
          </label>
          <input
            className={styles.form_field}
            type="file"
            name="file"
            id="file"
            accept=".csv"
          />
        </div>

        <button className={styles.submit_button}>Submit</button>
      </div>
    </div></div>
  );
};

export default FileUpload;
