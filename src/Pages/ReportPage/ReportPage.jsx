import React, { useState, useEffect } from "react";
import { Progress } from "@chakra-ui/react";
import styles from "./ReportPage.module.css";

const ReportPage = ({ totalNumber, successList, failureList }) => {
  useEffect(() => {
    console.log(successList.length);
    console.log(failureList.length);
    let progressCount =
      ((successList.length + failureList.length) / totalNumber) * 100;
    console.log(progressCount);
    setProgress(progressCount);
  });

  const [progress, setProgress] = useState(0);

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
              <Progress colorScheme="green" size="lg" value={progress} />
              <p className={styles.progress_text}>
                {successList.length + failureList.length}/{totalNumber} Mails
                Sent
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
