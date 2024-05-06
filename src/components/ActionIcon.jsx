import PropTypes from 'prop-types';
import styled from 'styled-components';

const SVG = styled.svg`
  width: 24px;
  height: 24px;
  fill: white;

  .st0 {
    fill: none;
    stroke: white;
    stroke-miterlimit: 10;
  }
`;

const ActionIcon = ({ actions }) => {
  if (actions === 0) {
    return (
      <SVG version="1.1" x="0px" y="0px" viewBox="0 0 24 24">
        <polygon
          className="st0"
          points="8.7,8.3 12.3,12 8.7,15.7 12.3,19.3 19.7,12 12.3,4.7 "
        />
        <rect
          x="5.9"
          y="9.8"
          transform="matrix(0.7071 -0.7071 0.7071 0.7071 -6.1095 9.2503)"
          className="st0"
          width="4.4"
          height="4.4"
        />
      </SVG>
    );
  } else if (actions === 1) {
    return (
      <SVG version="1.1" x="0px" y="0px" viewBox="0 0 24 24">
        <polygon points="8.7,8.3 12.3,12 8.7,15.7 12.3,19.3 19.7,12 12.3,4.7 " />
        <rect
          x="6"
          y="9.8"
          transform="matrix(0.7071 -0.7071 0.7071 0.7071 -6.088 9.3024)"
          width="4.4"
          height="4.4"
        />
      </SVG>
    );
  } else if (actions === 2) {
    return (
      <SVG version="1.1" x="0px" y="0px" viewBox="0 0 24 24">
        <polygon points="4.7,8.3 8.3,12 4.7,15.7 8.3,19.3 15.7,12 8.3,4.7 " />
        <polygon points="13.2,8.7 16.5,12 13.2,15.3 16.5,18.5 23,12 16.5,5.5 " />
        <rect
          x="2"
          y="9.8"
          transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.2595 6.4739)"
          width="4.4"
          height="4.4"
        />
      </SVG>
    );
  }
};

export default ActionIcon;

ActionIcon.propTypes = {
  actions: PropTypes.oneOf([0, 1, 2, 3]).isRequired,
};
