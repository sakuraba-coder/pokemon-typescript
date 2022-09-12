import { memo, useCallback } from "react";
import { createRoutesFromChildren } from "react-router-dom";

export const getAllPokemon = (url: string): Promise<any> => {
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
      .then((data) => resolve(data));
  });
};

export const getPokemon = (url: string) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
};
