import React from "react";
import MenuPosts from "./MenuPosts";
import MenuCategories from "./MenuCategories";

const Menu = () => {
  return (
    <div className="w-full mb-4 lg:mt-9">
      {/* Most Popular */}
      <MenuPosts title="Most Popular" subtitle="What's hot" withImage={true} />

      {/* Categories */}
      <MenuCategories />
      {/* Editor's Picks */}
      <MenuPosts
        title="Editor's Pick"
        subtitle="Chosen by the editor"
        withImage={true}
      />
    </div>
  );
};

export default Menu;
