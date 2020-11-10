/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.less';
// import { ThemeContext } from '../provider';

const ListButton = ({ title, setClicked, action }) => {
  // const theme = useContext(ThemeContext);
  // console.log(theme, 'theme');
  function handleClick() {
    if (setClicked && typeof setClicked === 'function') setClicked(title);
    if (action && typeof action === 'function') action(title);
  }

  return (
    <li className={styles.li}>
      <button
        type="button"
        onClick={handleClick}
        className="my-button"
      >
        {title}
      </button>
    </li>
  );
};

ListButton.defaultProps = {
  action: () => {},
  setClicked: () => {},
  title: '默认',
};

ListButton.propTypes = {
  action: PropTypes.func,
  setClicked: PropTypes.func,
  title: PropTypes.any,
};
export default ListButton;
