//Import Froala Editor plugins
import "froala-editor/js/plugins.pkgd.min.js";

// Import Froala Editor css files.
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

// Import Froala Editor component
import VueFroala from "vue-froala-wysiwyg";

export default async ({ app }) => {
  // Use Froala Editor Vue component
  app.use(VueFroala);
};
