import React, { useEffect } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerProps,
} from "@fluentui/react-components";
import { Dismiss24Regular, NavigationRegular } from "@fluentui/react-icons";

import { APP_NAME } from "@/lib/constants";
import { useGlobalStyles } from "@/lib/utils/fluentuiHelper";
import NavMenu from "./NavMenu";
import { usePathname } from "next/navigation";

type DrawerType = Required<DrawerProps>["type"];

export const NavOverlay = () => {
  const styles = useGlobalStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const [type] = React.useState<DrawerType>("overlay");
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    // Close the drawer on route change
    setIsOpen(false);
  }, [pathname]); // Trigger the effect when the path changes

  return (
    <>
      <Button
        shape="square"
        size="large"
        className={styles.toolbarNavButton}
        appearance="primary"
        onClick={() => setIsOpen(!isOpen)}
        icon={<NavigationRegular />}
      >
        {type === "inline" ? "Toggle" : APP_NAME}
      </Button>
      <Drawer
        type={type}
        separator
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            {APP_NAME}
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <NavMenu />
        </DrawerBody>
      </Drawer>
    </>
  );
};
