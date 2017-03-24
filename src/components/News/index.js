import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';
function News({newData, newLoading, width, height}) {
  return (
    <div className={styles.normal} style={{ width, height }}>
      <div className={styles.title}>电池回收新闻</div>
      <Spin spinning={newLoading}>
        <div className={styles.list}>
          {newData.map((item, index) => {
            if (index >= 6) return null;
            return <div className={styles.item} key={index}>
              <h5><a href={'http://www.gg-lb.com/' + item.linkHref} target="_blank">{item.linkText}</a><span>{item.timeStr}</span></h5>
              <a href={'http://www.gg-lb.com/' + item.linkHref} target="_blank">{item.summary}</a>
            </div>
          })}
        </div>
      </Spin>
    </div>
  )
}
News.defaultProps = {
  height: 500,
  widht: 500,
  newLoading: false,
  newData: []
}
export default News;
