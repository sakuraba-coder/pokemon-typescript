export const getPokemons = (url: string): Promise<any> => {
  // Promise:全て解決するまで待ってね
  return new Promise((resolve, reject) => {
    // データ取得
    fetch(url)
      // 取得したデータをjson形式にする
      .then((res) => res.json())
      // 変換されたデータをresolveで返す
      // return が省略されている 元々はreturn resolve
      // return resolveで返すことで、非同期処理をチェーンしている
      // resolveの型はPromiseだから
      .then((data) => resolve(data))
      .catch((data) => reject(data));
  });
};

export const getPokemon = (url: string) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((data) => {
        reject(data);
      });
  });
};

export const getAllPokemon = async (URL: string) => {
  //全ポケモン取得
  const promises = [];
  let i = 1;
  while (true) {
    const url = `${URL}/${i}`;
    const response = await fetch(url);
    if (response.ok) {
      promises.push(response.json());
    } else {
      break;
    }
    i++;
  }

  return await Promise.all(promises);
};
