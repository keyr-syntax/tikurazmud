import React from 'react';

const NavigationMenu: React.FC = () => {
  return (
    <div className="flex flex-row m-auto my-6 justify-around">
      <a className="py-2 px-6 border rounded hover:bg-[#8d7fc9]" href="/">Home</a>
      <a className="py-2 px-6 border rounded hover:bg-[#8d7fc9]" href="/blog/ReactBlogComponent">Blog</a>
    </div>
  );
};

export default NavigationMenu; 