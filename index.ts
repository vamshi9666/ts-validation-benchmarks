import { run, bench, group } from "mitata";
import * as yup from "yup";
import Ajv from "ajv";
import fastJson from "fast-json-stringify";
import { z } from "zod";
import type { Assert } from "ts-runtime-checks";
import { assert } from "typia";
const ITERATIONS_LIMIT = 10000;
const enableYup = false;

const cases = (jsonObj: any) => {
  interface RootObject {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
  }

  interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
  }

  interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
  }

  interface Geo {
    lat: string;
    lng: string;
  }
  bench("vanilla json.parse()", () => {
    const str =
      '{"id":1,"name":"Leanne Graham","username":"Bret","email":"Sincere@april.biz","address":{"street":"Kulas Light","suite":"Apt. 556","city":"Gwenborough","zipcode":"92998-3874","geo":{"lat":"-37.3159","lng":"81.1496"}},"phone":"1-770-736-8031 x56442","website":"hildegard.org","company":{"name":"Romaguera-Crona","catchPhrase":"Multi-layered client-server neural-net","bs":"harness real-time e-markets"}}';
    for (let index = 0; index < ITERATIONS_LIMIT; index++) {
      JSON.parse(str);
    }
  });

  bench("fast-json-stringify", () => {
    const stringify = fastJson({
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
        name: {
          type: "string",
        },
        username: {
          type: "string",
        },
        email: {
          type: "string",
        },
        address: {
          type: "object",
          properties: {
            street: {
              type: "string",
            },
            suite: {
              type: "string",
            },
            city: {
              type: "string",
            },
            zipcode: {
              type: "string",
            },
            geo: {
              type: "object",
              properties: {
                lat: {
                  type: "string",
                },
                lng: {
                  type: "string",
                },
              },
              required: ["lat", "lng"],
            },
          },
          required: ["street", "suite", "city", "zipcode", "geo"],
        },
        phone: {
          type: "string",
        },
        website: {
          type: "string",
        },
        company: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            catchPhrase: {
              type: "string",
            },
            bs: {
              type: "string",
            },
          },
          required: ["name", "catchPhrase", "bs"],
        },
      },
      required: [
        "id",
        "name",
        "username",
        "email",
        "address",
        "phone",
        "website",
        "company",
      ],
    });
    for (let index = 0; index < ITERATIONS_LIMIT; index++) {
      try {
        stringify(jsonObj);
      } catch (error) {}
    }
  });

  bench("ajv", async () => {
    const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

    const stringify = ajv.compile({
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
        name: {
          type: "string",
        },
        username: {
          type: "string",
        },
        email: {
          type: "string",
        },
        address: {
          type: "object",
          properties: {
            street: {
              type: "string",
            },
            suite: {
              type: "string",
            },
            city: {
              type: "string",
            },
            zipcode: {
              type: "string",
            },
            geo: {
              type: "object",
              properties: {
                lat: {
                  type: "string",
                },
                lng: {
                  type: "string",
                },
              },
              required: ["lat", "lng"],
            },
          },
          required: ["street", "suite", "city", "zipcode", "geo"],
        },
        phone: {
          type: "string",
        },
        website: {
          type: "string",
        },
        company: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            catchPhrase: {
              type: "string",
            },
            bs: {
              type: "string",
            },
          },
          required: ["name", "catchPhrase", "bs"],
        },
      },
      required: [
        "id",
        "name",
        "username",
        "email",
        "address",
        "phone",
        "website",
        "company",
      ],
    });
    for (let index = 0; index < ITERATIONS_LIMIT; index++) {
      try {
        stringify(jsonObj);
      } catch (error) {}
    }
  });
  bench("zod", async () => {
    const zodSchema = z.object({
      id: z.number(),
      name: z.string(),
      username: z.string(),
      email: z.string(),
      website: z.string(),
      phone: z.string(),
      address: z.object({
        street: z.string(),
        suite: z.string(),
        city: z.string(),
        zipcode: z.string(),
        geo: z.object({
          lat: z.string(),
          lng: z.string(),
        }),
      }),
    });

    for (let index = 0; index < ITERATIONS_LIMIT; index++) {
      try {
        zodSchema.parse(jsonObj);
      } catch (error) {}
    }
  });
  if (enableYup) {
    bench("yup", async () => {
      const zodSchema = yup.object({
        id: yup.number(),
        name: yup.string(),
        username: yup.string(),
        email: yup.string(),
        website: yup.string(),
        phone: yup.string(),
        address: yup.object({
          street: yup.string(),
          suite: yup.string(),
          city: yup.string(),
          zipcode: yup.string(),
          geo: yup.object({
            lat: yup.string(),
            lng: yup.string(),
          }),
        }),
      });
      for (let index = 0; index < ITERATIONS_LIMIT; index++) {
        zodSchema.validate(jsonObj);
      }
    });
  }

  bench("ts-runtime-checks", async () => {
    function parse(input: Assert<RootObject>) {
      return input;
    }

    for (let index = 0; index < ITERATIONS_LIMIT; index++) {
      try {
        // @ts-ignore
        parse(jsonObj);
      } catch (error) {}
    }
  });
  bench("typia", async () => {
    for (let index = 0; index < ITERATIONS_LIMIT; index++) {
      try {
        assert<RootObject>(jsonObj);
      } catch (error) {}
    }
  });
};

group("parse - valid ", () => {
  const jsonObj = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    //   email: 111,
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };
  cases(jsonObj);
});

group("parse - invalid ", () => {
  const jsonObj = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: 111,
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };

  cases(jsonObj);
});

await run({
  avg: true, // enable/disable avg column (default: true)
  colors: true, // enable/disable colors (default: true)
  min_max: false, // enable/disable min/max column (default: true)
  percentiles: false, // enable/disable percentiles column (default: true)
});
