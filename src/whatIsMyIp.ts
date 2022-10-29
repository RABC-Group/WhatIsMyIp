const promise = async (type: "internal" | "public", family: "v4" | "v6") => {};

const sync = (type: "internal" | "public", family: "v4" | "v6") => {};

export const internal = {
  v4: promise("internal", "v4"),
  v4Sync: sync("internal", "v4"),
  v6: promise("internal", "v6"),
  v6Sync: sync("internal", "v6"),
};
