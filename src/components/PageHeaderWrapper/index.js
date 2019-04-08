import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PageHeader from '../PageHeader';
import GridContent from './GridContent';
import styles from './index.module.less';
import MenuContext from '../../layouts/MenuContext';

const PageHeaderWrapper = ({
  children, contentWidth, wrapperClassName, top, ...restProps
}) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
    <MenuContext.Consumer>
      {value => (
        <PageHeader
          wide={contentWidth === 'Fixed'}
          home="Home"
          {...value}
          key="pageheader"
          {...restProps}
          linkElement={Link}
          itemRender={(item) => {
            if (item.locale) {
              return item.title || item.name;
            }
            return item.title || item.name;
          }}
        />
      )}
    </MenuContext.Consumer>
    {children ? (
      <div className={styles.content}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </div>
);

export default connect(({ setting }) => ({
  contentWidth: setting.contentWidth,
}))(PageHeaderWrapper);
