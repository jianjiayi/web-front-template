import React, { memo } from 'react';
import {
  Row, Col, Card, Tabs, DatePicker,
} from 'antd';
// import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import numeral from 'numeral';
import styles from './Analysis.module.less';
import { Bar } from '../../components/Charts';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

const SalesCard = memo(
  ({
    rangePickerValue, salesData, isActive, handleRangePickerChange, loading, selectDate,
  }) => (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <div className={styles.salesExtra}>
                <a className={isActive('today')} href="#nokey" onClick={() => selectDate('today')}>
                  All Day
                </a>
                <a className={isActive('week')} href="#nokey" onClick={() => selectDate('week')}>
                  All Week
                </a>
                <a className={isActive('month')} href="#nokey" onClick={() => selectDate('month')}>
                  All Month
                </a>
                <a className={isActive('year')} href="#nokey" onClick={() => selectDate('year')}>
                  All Year
                </a>
              </div>
              <RangePicker
                value={rangePickerValue}
                onChange={handleRangePickerChange}
                style={{ width: 256 }}
              />
            </div>
          }
          size="large"
          tabBarStyle={{ marginBottom: 24 }}
        >
          <TabPane
            tab="Sales"
            key="sales"
          >
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={295}
                    title="Sales Trend"
                    data={salesData}
                  />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>
                    Sales Ranking
                  </h4>
                  <ul className={styles.rankingList}>
                    {rankingListData.map((item, i) => (
                      <li key={item.title}>
                        <span
                          className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                        >
                          {i + 1}
                        </span>
                        <span className={styles.rankingItemTitle} title={item.title}>
                          {item.title}
                        </span>
                        <span className={styles.rankingItemValue}>
                          {numeral(item.total).format('0,0')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane
            tab="Visits"
            key="views"
          >
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar
                    height={292}
                    title="Visits Trend"
                    data={salesData}
                  />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>
                    Visits Ranking
                  </h4>
                  <ul className={styles.rankingList}>
                    {rankingListData.map((item, i) => (
                      <li key={item.title}>
                        <span
                          className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                        >
                          {i + 1}
                        </span>
                        <span className={styles.rankingItemTitle} title={item.title}>
                          {item.title}
                        </span>
                        <span>{numeral(item.total).format('0,0')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  ),
);

export default SalesCard;
