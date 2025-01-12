import journal from "./meta/_journal.json";
import m0000 from "./0000_youthful_talon.sql";
import m0001 from "./0001_vengeful_jack_flag.sql";
import m0002 from "./0002_seed-languages.sql";

export default {
  journal,
  migrations: {
    m0000,
    m0001,
    m0002,
  },
};
