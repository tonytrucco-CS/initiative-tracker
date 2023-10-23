import styled from 'styled-components';
import Participant from './Participant';
import Row from './Row';
import { useContext, useRef, useState } from 'react';
import InitiativeContext from '../context/InitiativeContext';

const Flex = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-direction: column;
  touch-action: none;
  -ms-touch-action: none;
`;

const List = () => {
  const { initValues, setInitValues } = useContext(InitiativeContext);
  const { participants } = initValues;
  const [isDragging, setDragging] = useState();

  const containerRef = useRef();

  function startDrag(e, index) {
    if (!detectLeftButton(e)) return;

    setDragging(index);

    // set the container ref and grab the dragged item based on that
    const container = containerRef.current;
    const items = [...container.childNodes];
    const dragItem = items[index];
    const itemsBelowDragItem = items.slice(index + 1);
    const notDragItems = items.filter((_, i) => i !== index);
    const dragData = participants[index];
    let newParticipants = participants;

    // get original position of mouse
    let y = e.clientY;

    // perform function on hover
    document.onpointermove = dragMove;

    function dragMove(e) {
      // calculate move distance
      const posY = e.clientY - y;

      // move the items
      dragItem.style.transform = `translateY(${posY}px)`;

      // swap position and data
      notDragItems.forEach((item) => {
        // check for overlap
        const rect1 = dragItem.getBoundingClientRect();
        const rect2 = item.getBoundingClientRect();

        let isOverlapping =
          rect1.y < rect2.y + rect2.height / 2 &&
          rect1.y + rect1.height / 2 > rect2.y;

        if (isOverlapping) {
          // swap position
          if (item.getAttribute('style')) {
            item.style.transform = '';
            index++;
          } else {
            item.style.transform = `translateY(${distance}px)`;
            index--;
          }

          // swap data
          newParticipants = participants.filter(
            (item) => item.name !== dragData.name,
          );
          newParticipants.splice(index, 0, dragData);
        }
      });
    }

    const dragBoundingRect = dragItem.getBoundingClientRect();

    const space =
      items[1].getBoundingClientRect().top -
      items[0].getBoundingClientRect().bottom;

    // set dragging styles for element being dragged
    dragItem.style.position = 'fixed';
    dragItem.style.zIndex = 5000;
    dragItem.style.width = dragBoundingRect.width + 'px';
    dragItem.style.height = dragBoundingRect.height + 'px';
    dragItem.style.top = dragBoundingRect.top + 'px';
    dragItem.style.left = dragBoundingRect.left + 'px';
    dragItem.style.cursor = 'grabbing';

    // build the placeholder element
    const div = document.createElement('div');
    div.id = 'div-temp';
    div.style.width = dragBoundingRect.width + 'px';
    div.style.height = dragBoundingRect.height + 'px';
    div.style.pointerEvents = 'none';
    container.appendChild(div);

    const distance = dragBoundingRect.height + space;

    itemsBelowDragItem.forEach((item) => {
      item.style.transform = `translateY(${distance}px)`;
    });

    document.onpointerup = dragEnd;
    // end the drag
    function dragEnd() {
      document.onpointerup = '';
      document.onpointermove = '';

      setDragging(undefined);
      dragItem.style = '';

      container.removeChild(div);

      items.forEach((item) => (item.style = ''));

      setInitValues({
        ...initValues,
        participants: newParticipants,
      });
    }
  }

  const detectLeftButton = (e) => {
    if ('buttons' in e) {
      return e.buttons === 1;
    }

    let button = e.which || e.button;
    return button === 1;
  };

  return (
    <Flex ref={containerRef}>
      {participants.map((part, index) => {
        const { name, type, initiative, action, status } = part;
        return (
          <Row
            key={index}
            status={status}
            name={name}
            action={action}
            dragging={isDragging}
            index={index}
          >
            <Participant
              name={name}
              type={type}
              initiative={initiative}
              action={action}
              index={index}
              startDrag={startDrag}
            />
          </Row>
        );
      })}
    </Flex>
  );
};

export default List;
