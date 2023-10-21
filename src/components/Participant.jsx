import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { colors, fonts } from '../utils/variables';
import TypeIcon from './TypeIcon';
import { transparentize } from 'polished';
import IconButton from './IconButton';

const Div = styled.div`
  display: flex;
  flex: 1;
  border-radius: 0.25rem;
  transition: transform 0.6s;
  transition-timing-function: ease-in-out;
  ${(props) => {
    switch (props.action) {
      case 'normal':
        return css``;
      case 'delay':
        return css`
          transform: translateX(5em);
        `;
      case 'ready':
        return css`
          transform: translateX(10em);
        `;
      default:
        return css``;
    }
  }}
  border: solid 3px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 4px 4px 0.5rem ${transparentize(0.5, colors.black)};
  ${(props) => {
    switch (props.type) {
      case 'pc':
        return css`
          border-color: ${colors.theme.blue};
          background-color: ${colors.theme.blue};
        `;
      case 'ally':
        return css`
          border-color: ${colors.theme.green};
          background-color: ${colors.theme.green};
        `;
      case 'foe':
        return css`
          border-color: ${colors.theme.red};
          background-color: ${colors.theme.red};
        `;
      case 'hazard':
        return css`
          border-color: ${colors.theme.orange};
          background-color: ${colors.theme.orange};
        `;
      default:
        return css`
          border-color: ${colors.theme.light_gray};
          background-color: ${colors.theme.light_gray};
        `;
    }
  }}
`;

const NameAndType = styled.span`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 3px;
`;

const Name = styled.div`
  background-color: ${colors.gray600};
  border-radius: 0.25rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  padding-left: 0.5rem;
`;

const Initiative = styled.span`
  padding: 0.5rem;
  height: 2.5rem;
  width: 2.5rem;
  align-items: center;
  justify-content: flex-end;
  display: flex;
  font-family: ${fonts.mono};
  font-weight: 800;
  ${(props) => {
    switch (props.type) {
      case 'pc':
        return css`
          color: ${transparentize(0.15, colors.white)};
        `;
      case 'ally':
        return css`
          color: ${transparentize(0.15, colors.white)};
        `;
      case 'foe':
        return css`
          color: ${transparentize(0.15, colors.white)};
        `;
      case 'hazard':
        return css`
          color: ${transparentize(0.15, colors.black)};
        `;
      default:
        return css``;
    }
  }}
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 2.5rem;
  padding: 0 0.5rem;
  align-items: center;
`;

const Participant = ({
  name,
  type = 'pc',
  initiative,
  action = 'normal',
  index,
  startDrag,
}) => {
  return (
    <Div type={type} action={action}>
      <Actions>
        <IconButton
          icon="drag_indicator"
          onPointerDown={startDrag}
          index={index}
        />
      </Actions>
      <NameAndType>
        <TypeIcon type={type} />
        <Name>{name}</Name>
      </NameAndType>
      <Initiative type={type}>{initiative}</Initiative>
    </Div>
  );
};

export default Participant;

Participant.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['pc', 'ally', 'foe', 'hazard']).isRequired,
  initiative: PropTypes.number.isRequired,
  action: PropTypes.oneOf(['normal', 'ready', 'delay']).isRequired,
  index: PropTypes.number.isRequired,
  startDrag: PropTypes.func.isRequired,
};
