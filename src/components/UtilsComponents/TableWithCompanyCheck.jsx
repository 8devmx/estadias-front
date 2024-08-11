import React, { useEffect, useState } from 'react';

const TableWithCompanyCheck = ({ children }) => {
  const [showCompanyColumn, setShowCompanyColumn] = useState(true);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail && storedEmail !== 'techpech@protonmail.mx') {
      setShowCompanyColumn(false);
    }
  }, []);

  // Clonamos los hijos para pasarles la prop showCompanyColumn
  return React.Children.map(children, child =>
    React.cloneElement(child, { showCompanyColumn })
  );
};

export default TableWithCompanyCheck;


