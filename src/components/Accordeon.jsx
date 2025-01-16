import PropTypes from 'prop-types';
import { useState } from 'react';

function AccordionItem({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleItem = () => {
    setIsOpen((prev) => !prev);
  };

  const icon = () => { 
    return isOpen ? '-' : '+' 
  };

  return (
    <div style={{ marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <div
        style={{
          padding: '10px',
          background: '#f7f7f7',
          cursor: 'pointer',
          borderBottom: '1px solid #ddd',
        }}
        onClick={toggleItem}
      >
        {`${icon()} ${title}`}
      </div>

      {isOpen && (
        <div style={{ padding: '10px', background: '#fff' }}>
          {content}
        </div>
      )}
    </div>
  );
}

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired
};

export default AccordionItem;