import React, { useState, useEffect } from "react";
import styles from "./ReportPage.module.css";

const ReportPage = ({successList, failureList }) => {

  useEffect(() => {
    console.log(successList);
    console.log(failureList);
  });

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
            <div className={styles.report_section}>
              You are viewing the report section
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
