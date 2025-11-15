import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

const THEMES = { light: "", dark: ".dark" };

const ChartContext = React.createContext(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-auto h-full w-full flex-col justify-center overflow-hidden rounded-md bg-transparent p-0 [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-default-tooltip]:border-border [&_.recharts-default-tooltip]:bg-background [&_.recharts-default-tooltip]:shadow-md [&_.recharts-legend-wrapper]:px-2 [&_.recharts-legend-wrapper_div]:flex-direction-row [&_.recharts-legend-wrapper_span]:margin-right-12px [&_.recharts-pie-sector[stroke='#fff']]:stroke-transparent [&_.recharts-radial-bar-background-sector[stroke='#fff']]:stroke-transparent [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-area-background-fill_svg-rect]:fill-muted [&_.recharts-reference-area-background-fill_svg-rect]:fill-opacity-40 [&_.recharts-reference-line-label]:fill-muted-foreground [&_.recharts-surface]:overflow-visible [&_.recharts-tooltip-cursor]:fill-muted [&_.recharts-wrapper]:outline-none dark:[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground dark:[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border-50 dark:[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border dark:[&_.recharts-default-tooltip]:border-border dark:[&_.recharts-default-tooltip]:bg-background dark:[&_.recharts-default-tooltip]:shadow-md dark:[&_.recharts-legend-wrapper_span]:margin-right-12px dark:[&_.recharts-pie-sector[stroke='#fff']]:stroke-transparent dark:[&_.recharts-radial-bar-background-sector[stroke='#fff']]:stroke-transparent dark:[&_.recharts-reference-area-background-fill_svg-rect]:fill-muted dark:[&_.recharts-reference-area-background-fill_svg-rect]:fill-opacity-40 dark:[&_.recharts-reference-line-label]:fill-muted-foreground",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

const ChartStyle = ({ id, config }) => {
  const colorList = Object.entries(config).map(([key, value]) => {
    if (typeof value === "object" && "theme" in value) {
      return `--color-${key}: ${value.theme.light};`;
    }
    return `--color-${key}: ${value.color};`;
  });

  const dark = Object.entries(config).map(([key, value]) => {
    if (typeof value === "object" && "theme" in value) {
      return `--color-${key}: ${value.theme.dark};`;
    }
    return "";
  });

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
        [data-chart="${id}"] {
          ${colorList.join(" ")}
        }
        [data-theme="dark"] [data-chart="${id}"] {
          ${dark.join(" ")}
        }
      `,
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef(({ active, payload, label, labelFormatter, formatter, color, nameKey, labelKey }, ref) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-sm shadow-xl"
    >
      {label && (
        <div className="flex items-center">
          {labelFormatter ? (
            <span className="text-muted-foreground">
              {labelFormatter(label, payload)}
            </span>
          ) : (
            <span className="text-muted-foreground">{label}</span>
          )}
        </div>
      )}
      {payload.map((item, index) => {
        const key = `${item.dataKey}`;
        const itemConfig = config[String(item.dataKey)] || config[nameKey || key] || {};
        const itemColor = "color" in itemConfig ? itemConfig.color : item.color;

        return (
          <div key={`${key}-${index}`} className="flex items-center gap-1.5">
            {itemColor && (
              <div
                className="h-3 w-3 shrink-0 rounded-[2px]"
                style={{ backgroundColor: itemColor }}
              />
            )}
            <div className="flex items-center justify-between gap-8">
              <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
              {formatter && typeof formatter === "function"
                ? formatter(item.value, item.name, item)
                : item.value}
            </div>
          </div>
        );
      })}
    </div>
  );
});
ChartTooltipContent.displayName = "ChartTooltip";

export {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  useChart,
};
