import styles from "./dashboard.module.scss";

import Cards from "./cards/Cards";
import Scenes from "./scenes/Scenes";

function Dashboard() {
  return (
    <>
      <div className={styles.container}>
        <Scenes />
        <div className={styles["big-line"]}></div>
        <Cards />
      </div>
    </>
  );
}

export default Dashboard;
