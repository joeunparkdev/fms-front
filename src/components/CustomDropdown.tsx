import React from 'react';

type CustomDropdownProps = {
  items: { label: string; value: string }[];
  onSelect: (value: string) => void;
  fontSize: string; // 글꼴 크기를 설정할 prop 추가
  dropdownWidth: string; // 드롭다운 너비를 설정할 prop 추가
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({ items, onSelect, fontSize, dropdownWidth }) => {
  return (
    <div style={{ width: dropdownWidth }}> {/* 드롭다운의 너비를 prop으로 설정 */}
      {/* 여기에 드롭다운 컴포넌트의 JSX 코드를 작성합니다. */}
      <select
        style={{ width: '100%', fontSize: fontSize }} // 드롭다운의 너비와 글꼴 크기를 설정
        onChange={(e) => onSelect(e.target.value)}
      >
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
