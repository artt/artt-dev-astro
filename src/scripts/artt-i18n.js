import fg from "fast-glob";

export function i18n() {

  return {
    name: "artt-i18n",
    hooks: {
      "astro:config:setup": async ({
        config,
        updateConfig,
        addMiddleware,
        command,
        injectRoute,
        logger,
      }) => {

        const included = ["./src/pages/**/*"]
        const excluded = ["./src/pages/api/**/*"]

        const entries = fg.stream(included, {
          ignore: excluded,
          onlyFiles: true,
        });

        console.log('xxxxxxxx')
        console.log(entries)

        // let entry: string;

        for await (let e of entries) {
          console.log(e)
        }
      }
    }
  }

}
