import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTachometerAlt,
  faObjectGroup,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBook,
  faBookOpen,
  faBookReader,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

library.add(faBook, faBookOpen, faBookReader, faBookmark);
library.add(faTachometerAlt, faObjectGroup);

const SidebarComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className="mt-2 fixed">
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
        backgroundColor="white"
      >
        <Menu iconShape="square">
          <MenuItem
            component={<Link to="/backlog" />}
            icon={<FontAwesomeIcon icon="book" />}
          >
            Backlog
          </MenuItem>
          {/* board */}
          <SubMenu
            label="Sprints"
            open={true}
            icon={<FontAwesomeIcon icon="book-open" />}
            popupclassname="sprint-submenu"
          >
          <MenuItem
            component={<Link to="/taskboard" />}
            icon={<FontAwesomeIcon icon="object-group" />}
            >
            Board
            </MenuItem>
            <MenuItem
              component={<Link to="/burndownchart" />}
              icon={<FontAwesomeIcon icon="tachometer-alt" />}
            >
              Burndown Chart
            </MenuItem>
            </SubMenu>
          {/* completed sprints */}
          <MenuItem
            component={<Link to="/completedsprints" />}
            icon={<FontAwesomeIcon icon="bookmark" />}
          >
            Completed Sprints
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
