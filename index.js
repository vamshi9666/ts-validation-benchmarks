import { run, bench, group } from "mitata";
import Ajv from "ajv";
import fastJson from "fast-json-stringify";
import { z } from "zod";
import { assert } from "typia";
const ITERATIONS_LIMIT = 10000;
const cases = (jsonObj) => {
    bench("vanilla json.parse()", () => {
        const str = '{"id":1,"name":"Leanne Graham","username":"Bret","email":"Sincere@april.biz","address":{"street":"Kulas Light","suite":"Apt. 556","city":"Gwenborough","zipcode":"92998-3874","geo":{"lat":"-37.3159","lng":"81.1496"}},"phone":"1-770-736-8031 x56442","website":"hildegard.org","company":{"name":"Romaguera-Crona","catchPhrase":"Multi-layered client-server neural-net","bs":"harness real-time e-markets"}}';
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
            }
            catch (error) { }
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
            }
            catch (error) { }
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
            }
            catch (error) { }
        }
    });
    //   bench("yup", async () => {
    //     const zodSchema = yup.object({
    //       id: yup.number(),
    //       name: yup.string(),
    //       username: yup.string(),
    //       email: yup.string(),
    //       website: yup.string(),
    //       phone: yup.string(),
    //       address: yup.object({
    //         street: yup.string(),
    //         suite: yup.string(),
    //         city: yup.string(),
    //         zipcode: yup.string(),
    //         geo: yup.object({
    //           lat: yup.string(),
    //           lng: yup.string(),
    //         }),
    //       }),
    //     });
    //     for (let index = 0; index < ITERATIONS_LIMIT; index++) {
    //       zodSchema.validate(jsonObj);
    //     }
    //   });
    bench("ts-runtime-checks", async () => {
        function parse(input) {
            if (typeof input !== "object")
                throw new Error("Expected input to be RootObject.");
            if (typeof input["id"] !== "number")
                throw new Error("Expected input.id to be number.");
            if (typeof input["name"] !== "string")
                throw new Error("Expected input.name to be string.");
            if (typeof input["username"] !== "string")
                throw new Error("Expected input.username to be string.");
            if (typeof input["email"] !== "string")
                throw new Error("Expected input.email to be string.");
            if (typeof input["address"] !== "object")
                throw new Error("Expected input.address to be Address.");
            if (typeof input["address"]["street"] !== "string")
                throw new Error("Expected input.address.street to be string.");
            if (typeof input["address"]["suite"] !== "string")
                throw new Error("Expected input.address.suite to be string.");
            if (typeof input["address"]["city"] !== "string")
                throw new Error("Expected input.address.city to be string.");
            if (typeof input["address"]["zipcode"] !== "string")
                throw new Error("Expected input.address.zipcode to be string.");
            if (typeof input["address"]["geo"] !== "object")
                throw new Error("Expected input.address.geo to be Geo.");
            if (typeof input["address"]["geo"]["lat"] !== "string")
                throw new Error("Expected input.address.geo.lat to be string.");
            if (typeof input["address"]["geo"]["lng"] !== "string")
                throw new Error("Expected input.address.geo.lng to be string.");
            if (typeof input["phone"] !== "string")
                throw new Error("Expected input.phone to be string.");
            if (typeof input["website"] !== "string")
                throw new Error("Expected input.website to be string.");
            if (typeof input["company"] !== "object")
                throw new Error("Expected input.company to be Company.");
            if (typeof input["company"]["name"] !== "string")
                throw new Error("Expected input.company.name to be string.");
            if (typeof input["company"]["catchPhrase"] !== "string")
                throw new Error("Expected input.company.catchPhrase to be string.");
            if (typeof input["company"]["bs"] !== "string")
                throw new Error("Expected input.company.bs to be string.");
            return input;
        }
        for (let index = 0; index < ITERATIONS_LIMIT; index++) {
            try {
                // @ts-ignore
                parse(jsonObj);
            }
            catch (error) { }
        }
    });
    bench("typia", async () => {
        for (let index = 0; index < ITERATIONS_LIMIT; index++) {
            try {
                (input => {
                    const $guard = assert.guard;
                    ((input, _path, _exceptionable = true) => {
                        const $ao0 = (input, _path, _exceptionable = true) => ("number" === typeof input.id || $guard(_exceptionable, {
                            path: _path + ".id",
                            expected: "number",
                            value: input.id
                        })) && ("string" === typeof input.name || $guard(_exceptionable, {
                            path: _path + ".name",
                            expected: "string",
                            value: input.name
                        })) && ("string" === typeof input.username || $guard(_exceptionable, {
                            path: _path + ".username",
                            expected: "string",
                            value: input.username
                        })) && ("string" === typeof input.email || $guard(_exceptionable, {
                            path: _path + ".email",
                            expected: "string",
                            value: input.email
                        })) && (("object" === typeof input.address && null !== input.address || $guard(_exceptionable, {
                            path: _path + ".address",
                            expected: "Resolve<Address>",
                            value: input.address
                        })) && $ao1(input.address, _path + ".address", true && _exceptionable)) && ("string" === typeof input.phone || $guard(_exceptionable, {
                            path: _path + ".phone",
                            expected: "string",
                            value: input.phone
                        })) && ("string" === typeof input.website || $guard(_exceptionable, {
                            path: _path + ".website",
                            expected: "string",
                            value: input.website
                        })) && (("object" === typeof input.company && null !== input.company || $guard(_exceptionable, {
                            path: _path + ".company",
                            expected: "Resolve<Company>",
                            value: input.company
                        })) && $ao3(input.company, _path + ".company", true && _exceptionable));
                        const $ao1 = (input, _path, _exceptionable = true) => ("string" === typeof input.street || $guard(_exceptionable, {
                            path: _path + ".street",
                            expected: "string",
                            value: input.street
                        })) && ("string" === typeof input.suite || $guard(_exceptionable, {
                            path: _path + ".suite",
                            expected: "string",
                            value: input.suite
                        })) && ("string" === typeof input.city || $guard(_exceptionable, {
                            path: _path + ".city",
                            expected: "string",
                            value: input.city
                        })) && ("string" === typeof input.zipcode || $guard(_exceptionable, {
                            path: _path + ".zipcode",
                            expected: "string",
                            value: input.zipcode
                        })) && (("object" === typeof input.geo && null !== input.geo || $guard(_exceptionable, {
                            path: _path + ".geo",
                            expected: "Resolve<Geo>",
                            value: input.geo
                        })) && $ao2(input.geo, _path + ".geo", true && _exceptionable));
                        const $ao2 = (input, _path, _exceptionable = true) => ("string" === typeof input.lat || $guard(_exceptionable, {
                            path: _path + ".lat",
                            expected: "string",
                            value: input.lat
                        })) && ("string" === typeof input.lng || $guard(_exceptionable, {
                            path: _path + ".lng",
                            expected: "string",
                            value: input.lng
                        }));
                        const $ao3 = (input, _path, _exceptionable = true) => ("string" === typeof input.name || $guard(_exceptionable, {
                            path: _path + ".name",
                            expected: "string",
                            value: input.name
                        })) && ("string" === typeof input.catchPhrase || $guard(_exceptionable, {
                            path: _path + ".catchPhrase",
                            expected: "string",
                            value: input.catchPhrase
                        })) && ("string" === typeof input.bs || $guard(_exceptionable, {
                            path: _path + ".bs",
                            expected: "string",
                            value: input.bs
                        }));
                        return ("object" === typeof input && null !== input || $guard(true, {
                            path: _path + "",
                            expected: "Resolve<RootObject>",
                            value: input
                        })) && $ao0(input, _path + "", true);
                    })(input, "$input", true);
                    return input;
                })(jsonObj);
            }
            catch (error) { }
        }
    });
};
group("parse - success ", () => {
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
group("parse - failure ", () => {
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
    avg: true,
    //   json: , // enable/disable json output (default: false)
    colors: true,
    min_max: false,
    //   collect: false, // enable/disable collecting returned values into an array during the benchmark (default: false)
    percentiles: false, // enable/disable percentiles column (default: true)
});
