import { theme } from "antd";

export const getAntdTheme = (isDark) => ({
  algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,

  token: {
    // Brand
    colorPrimary: "#dc2626", // red-600 (matches your Tailwind)

    // Backgrounds
    colorBgBase: isDark ? "#030712" : "#ffffff", // gray-950 / white
    colorBgContainer: isDark ? "#111827" : "#ffffff", // gray-900

    // Text
    colorText: isDark ? "#e5e7eb" : "#111827", // gray-200 / gray-900
    colorTextSecondary: isDark ? "#9ca3af" : "#4b5563", // gray-400 / gray-600

    // UI
    borderRadius: 8,
    fontFamily: "Inter, system-ui, sans-serif",
  },

  components: {
    Button: {
      controlHeight: 40,
    },
    Input: {
      controlHeight: 40,
    },
    Select: {
      controlHeight: 40,
    },
  },
});

