// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/SPKT_BAP/Ki3_Nam4/DoAn/project/demo1/frontend/jam-circle/node_modules/.pnpm/vite@5.4.11_sass@1.80.7/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/SPKT_BAP/Ki3_Nam4/DoAn/project/demo1/frontend/jam-circle/node_modules/.pnpm/@vitejs+plugin-vue@5.1.5_vite@5.4.11_vue@3.5.12/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/SPKT_BAP/Ki3_Nam4/DoAn/project/demo1/frontend/jam-circle/node_modules/.pnpm/unplugin-auto-import@0.18.3_@vueuse+core@11.2.0/node_modules/unplugin-auto-import/dist/vite.js";
import Pages from "file:///D:/SPKT_BAP/Ki3_Nam4/DoAn/project/demo1/frontend/jam-circle/node_modules/.pnpm/vite-plugin-pages@0.32.3_vite@5.4.11_vue-router@4.4.5/node_modules/vite-plugin-pages/dist/index.js";
import Layouts from "file:///D:/SPKT_BAP/Ki3_Nam4/DoAn/project/demo1/frontend/jam-circle/node_modules/.pnpm/vite-plugin-vue-layouts@0.11.0_vite@5.4.11_vue-router@4.4.5_vue@3.5.12/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import autoprefixer from "file:///D:/SPKT_BAP/Ki3_Nam4/DoAn/project/demo1/frontend/jam-circle/node_modules/.pnpm/autoprefixer@10.4.20_postcss@8.4.49/node_modules/autoprefixer/lib/autoprefixer.js";
import tailwind from "file:///D:/SPKT_BAP/Ki3_Nam4/DoAn/project/demo1/frontend/jam-circle/node_modules/.pnpm/tailwindcss@3.4.14/node_modules/tailwindcss/lib/index.js";
var __vite_injected_original_import_meta_url = "file:///D:/SPKT_BAP/Ki3_Nam4/DoAn/project/demo1/frontend/jam-circle/vite.config.js";
var vite_config_default = defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: [
        "vue",
        "vue-router"
      ]
    }),
    Pages(),
    Layouts()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxTUEtUX0JBUFxcXFxLaTNfTmFtNFxcXFxEb0FuXFxcXHByb2plY3RcXFxcZGVtbzFcXFxcZnJvbnRlbmRcXFxcamFtLWNpcmNsZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcU1BLVF9CQVBcXFxcS2kzX05hbTRcXFxcRG9BblxcXFxwcm9qZWN0XFxcXGRlbW8xXFxcXGZyb250ZW5kXFxcXGphbS1jaXJjbGVcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1NQS1RfQkFQL0tpM19OYW00L0RvQW4vcHJvamVjdC9kZW1vMS9mcm9udGVuZC9qYW0tY2lyY2xlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgUGFnZXMgZnJvbSAndml0ZS1wbHVnaW4tcGFnZXMnXHJcbmltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzJztcclxuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInXHJcbmltcG9ydCB0YWlsd2luZCBmcm9tICd0YWlsd2luZGNzcydcclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBjc3M6IHtcclxuICAgIHBvc3Rjc3M6IHtcclxuICAgICAgcGx1Z2luczogW3RhaWx3aW5kKCksIGF1dG9wcmVmaXhlcigpXSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoKSxcclxuICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxyXG4gICAgICBdXHJcbiAgICB9KSxcclxuICAgIFBhZ2VzKCksXHJcbiAgICBMYXlvdXRzKClcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICBcclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVgsU0FBUyxlQUFlLFdBQVc7QUFDdFosU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sV0FBVztBQUNsQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxjQUFjO0FBUHdOLElBQU0sMkNBQTJDO0FBUzlSLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNQLFNBQVMsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixXQUFXO0FBQUEsTUFDVCxTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUV0RDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
