import {
  useMantineColorScheme,
  useComputedColorScheme,
  Button,
} from "@mantine/core";
import classes from "./theme_toggler.module.css";
import { clsx } from "clsx";
import { IconMoon, IconSun } from "@tabler/icons-react";

export const ThemeToggler = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Button
      variant="filled"
      radius={10}
      size="compact-xl"
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      color={"secondary.5"}
      className="aspect-square p-2  hover:bg-secondary-600 bg-secondary-500"
    >
      <IconSun
        className={clsx(classes.icon, {
          hidden: computedColorScheme === "light",
        })}
      />
      <IconMoon
        className={clsx(classes.icon, {
          hidden: computedColorScheme === "dark",
        })}
      />
    </Button>
  );
};
