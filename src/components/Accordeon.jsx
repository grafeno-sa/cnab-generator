import PropTypes from 'prop-types';
import { useState } from 'react';

function AccordionItem({ 
  title, 
  content, 
  containerStyle = {}, 
  headerStyle = {}, 
  contentStyle = {} 
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleItem = () => {
    setIsOpen((prev) => !prev);
  };

  const icon = () => { 
    return isOpen ? '-' : '+' 
  };

  const defaultContainerStyle = { 
    marginBottom: '10px', 
    border: '1px solid #ddd', 
    borderRadius: '5px',
    ...containerStyle
  };
  
  const defaultHeaderStyle = {
    padding: '10px',
    background: '#f7f7f7',
    cursor: 'pointer',
    borderBottom: '1px solid #ddd',
    borderRadius: '5px',
    ...headerStyle
  };
  
  const defaultContentStyle = { 
    padding: '10px', 
    background: '#fff',
    borderRadius: '5px',
    ...contentStyle
  };

  return (
    <div style={defaultContainerStyle}>
      <div
        style={defaultHeaderStyle}
        onClick={toggleItem}
      >
        <span>{icon()} </span>
        {title}
      </div>

      {isOpen && (
        <div style={defaultContentStyle}>
          {content}
        </div>
      )}
    </div>
  );
}

AccordionItem.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  content: PropTypes.any.isRequired,
  containerStyle: PropTypes.object,
  headerStyle: PropTypes.object,
  contentStyle: PropTypes.object,
};

export default AccordionItem;