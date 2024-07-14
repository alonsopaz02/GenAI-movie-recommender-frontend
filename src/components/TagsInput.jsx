import React from 'react';
import '../styles/TagsInput.css';

const TagsInput = ({ tags, tagInput, handleTagInputChange, handleKeyDown, removeTag }) => {
  return (
    <div className="form-group">
      <label>Tags</label>
      <input
        type="text"
        value={tagInput}
        onChange={handleTagInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Agrega un tag y presiona Enter"
      />
      <div className="tags-list">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
            <button type="button" onClick={() => removeTag(index)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;