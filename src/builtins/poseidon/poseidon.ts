//This poseidon hash implementation was inspired by the following python one:
//https://github.com/CryptoExperts/poseidon/blob/main/sage/poseidon.sage

function hadesPermutation(values: bigint[], params: HadesParamsType): bigint[] {
  var roundIdx: number = 0;
  for (var i = 0; i < params.Rf / 2; i++) {
    values = hadesRound(values, params, true, roundIdx);
    roundIdx += 1;
  }
  for (var i = 0; i < params.Rp; i++) {
    values = hadesRound(values, params, false, roundIdx);
    roundIdx += 1;
  }
  for (var i = 0; i < params.Rf / 2; i++) {
    values = hadesRound(values, params, true, roundIdx);
    roundIdx += 1;
  }
  return values;
}

function hadesRound(
  values: bigint[],
  params: HadesParamsType,
  isFullRound: boolean,
  roundIdx: number,
): bigint[] {
  values = modAddVectors(values, params.ark[roundIdx]);

  if (isFullRound) {
    for (var i = 0; i < values.length; i++) {
      values[i] = modPow(values[i], 3);
    }
  } else {
    values[values.length - 1] = modPow(values[values.length - 1], 3);
  }
  values = modMulMatrixVector(params.mds, values);
  return values;
}

function poseidon(x: bigint, y: bigint, z: bigint): bigint[] {
  const params: HadesParamsType = {
    r: 2,
    c: 1,
    m: 3,
    Rf: 8,
    Rp: 83,
    nRounds: 91,
    outputSize: 1,
    ark: roundKeys,
    mds: matrix,
  };
  var values: bigint[] = [x, y, z];
  return hadesPermutation(values, params);
}

function modAddVectors(A: bigint[], B: bigint[]): bigint[] {
  var res: bigint[] = A;
  for (var i = 0; i < A.length; i++) {
    res[i] = modAdd(res[i], B[i]);
  }
  return res;
}

function modMulMatrixVector(A: bigint[][], X: bigint[]): bigint[] {
  var res: bigint[] = Array(X.length).fill(BigInt(0));
  for (var i = 0; i < A.length; i++) {
    for (var j = 0; j < A[0].length; j++) {
      res[i] = modAdd(res[i], modMul(A[i][j], X[j]));
    }
  }
  return res;
}
