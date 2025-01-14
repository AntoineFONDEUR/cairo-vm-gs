interface RegistersType {
  AP: string;
  FP: string;
  PC: string;
}

interface Op1SrcType {
  Op0: string;
  AP: string;
  FP: string;
  PC: string;
}

interface PCUpdatesType {
  Regular: string;
  Jump: string;
  JumpRel: string;
  Jnz: string;
}

interface ResLogicsType {
  Op1: string;
  Add: string;
  Mul: string;
  Unused: string;
}

interface OpcodesType {
  NOp: string;
  Call: string;
  Ret: string;
  AssertEq: string;
}

interface ApUpdatesType {
  Constant: string;
  AddRes: string;
  Add1: string;
  Add2: string;
}

interface FpUpdatesType {
  Constant: string;
  Dst: string;
  ApPlus2: string;
}

interface SignatureType {
  r: bigint;
  s: bigint;
}

interface HadesParamsType {
  r: number;
  c: number;
  m: number;
  Rf: number;
  Rp: number;
  nRounds: number;
  outputSize: number;
  ark: bigint[][];
  mds: bigint[][];
}

interface BuitlinType {
  freeCellsPerBuiltin: number;
  numOutputCells: number;
  column: string;
  functionName: string;
}

type Layout = {
  builtins: string[];
};

const PRIME: bigint = BigInt(
  "0x800000000000011000000000000000000000000000000000000000000000001",
);

const GENERATOR = new AffinePoint(
  "874739451078007766457464989774322083649278607533249481151382481072868806602",
  "152666792071518830868575557812948353041420400780739481342941381225525861407",
);
const ORDER = BigInt(
  "3618502788666131213697322783095070105526743751716087489154079457884512865583",
);

const ALPHA: bigint = BigInt(1);

const Registers: RegistersType = {
  AP: "AP",
  FP: "FP",
  PC: "PC",
};

const Op1Src: Op1SrcType = {
  Op0: "Op0",
  AP: "AP",
  FP: "FP",
  PC: "PC",
};

const PcUpdates: PCUpdatesType = {
  Regular: "PC + instruction size",
  Jump: "jmp abs",
  JumpRel: "jmp rel",
  Jnz: "jmp if != 0",
};

const ResLogics: ResLogicsType = {
  Op1: "Op1",
  Add: "Add",
  Mul: "Mul",
  Unused: "Unused",
};

const Opcodes: OpcodesType = {
  NOp: "",
  Call: "Call",
  Ret: "Ret",
  AssertEq: "AssertEq",
};

const ApUpdates: ApUpdatesType = {
  Constant: "AP",
  AddRes: "AP + res",
  Add1: "AP + 1",
  Add2: "AP + 2",
};

const FpUpdates: FpUpdatesType = {
  Constant: "FP",
  Dst: "Dst",
  ApPlus2: "AP + 2",
};

const FINAL_FP: string = "final_fp";
const FINAL_PC: string = "final_pc";

const layouts: { [key: string]: Layout } = {
  plain: {
    builtins: [],
  },
  small: {
    builtins: ["output", "pedersen", "range_check", "ecdsa"],
  },
  dex: {
    builtins: ["output", "pedersen", "range_check", "ecdsa"],
  },
  recursive: {
    builtins: ["output", "pedersen", "range_check", "bitwise"],
  },
  starknet: {
    builtins: [
      "output",
      "pedersen",
      "range_check",
      "ecdsa",
      "bitwise",
      "ec_op",
      "poseidon",
    ],
  },
  starknet_with_keccak: {
    builtins: [
      "output",
      "pedersen",
      "range_check",
      "ecdsa",
      "bitwise",
      "ec_op",
      "keccak",
      "poseidon",
    ],
  },
  recursive_large_output: {
    builtins: ["output", "pedersen", "range_check", "bitwise", "poseidon"],
  },
  recursive_with_poseidon: {
    builtins: ["output", "pedersen", "range_check", "bitwise", "poseidon"],
  },
  all_cairo: {
    builtins: [
      "output",
      "pedersen",
      "range_check",
      "ecdsa",
      "bitwise",
      "ec_op",
      "keccak",
      "poseidon",
      "range_check96",
    ],
  },
  all_solidity: {
    builtins: [
      "output",
      "pedersen",
      "range_check",
      "ecdsa",
      "bitwise",
      "ec_op",
    ],
  },
  dynamic: {
    builtins: [
      "output",
      "pedersen",
      "range_check",
      "ecdsa",
      "bitwise",
      "ec_op",
    ],
  },
};
