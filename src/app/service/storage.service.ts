import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public data: any = {};
  public storageName:string = "cartinfo";
constructor() {

  this.loadStorage();
}
loadStorage(){
  let temp =  localStorage.getItem(this.storageName);
  if(temp === undefined || temp === null || temp === ''){
    this.data = {};
  }else{
    this.data = JSON.parse( temp );
  }
}

set(obj:any){

   Object.keys(obj).forEach( (key) => {
     this.data[ key ] = obj[key];
   } );
   this.store();
}
store(){
  localStorage.setItem(this.storageName,JSON.stringify(this.data));
}

get(key=''){
  if(key!=''){
    return this.data[key];
  }else{
    return this.data;
  }
}

/**
   * @description This function is used to check string value if value is null,
   *  undefined then it returns true else false
   * @param  {string} str this paramater is used for checking the value
   * @returns boolean
   */
private isEmptyString(str: string) {
  try {
    return str === null || str === undefined || str.trim().length < 1;
  } catch (_e) {
    return false;
  }
}

/**
 * @description This function is used to check string value if value is null,
 *  undefined then it returns true else false
 * @param  {number} num this paramater is used for checking the value
 * @returns boolean
 */
private isEmptyNumber(num: number) {
  return num === null || num === undefined || Number.isNaN(num);
}

/**
 * @description This function is used to check string value if value is null,
 *  undefined then it returns true else false
 * @param  object this paramater is used for checking the value
 * @returns boolean
 */
private isEmptyObject(object: any) {
  return (
    object === null || object === undefined || Object.keys(object).length < 1
  );
}

/**
 * @description This function is used to check array if value is null,
 *  undefined then it returns true else false
 * @param  array this paramater is used for checking the value
 * @returns boolean
 */
private isEmptyArray(array: any) {
  return array === null || array === undefined || array.length < 1;
}

/**
 * @description Function to return if given value is empty based on its type
 * @param  {any} value
 * @returns boolean
 */
isEmpty(value: any) {
  if (Array.isArray(value)) {
    return this.isEmptyArray(value);
  } else if (typeof value === "string") {
    return this.isEmptyString(value);
  } else if (typeof value === "number") {
    return this.isEmptyNumber(value);
  }

  return this.isEmptyObject(value);
}

putInStorage(key: string, value: any) {
  typeof value === "string"
    ? localStorage.setItem(key, value)
    : localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @description Function to retrieve item from storage
 * @param  {string} key
 * @returns any
 */
getFromStorage(key: string) {
  const keyJson = localStorage.getItem(key);
  try {
    return keyJson !== null ? JSON.parse(keyJson) : null;
  } catch (error) {
    return localStorage.getItem(key);
  }
}

/**
 * @description Function to remove from storage if key is specified, or all items
 * @param  {string} key
 * @returns void
 */
removeFromStorage(key: string) {
  this.isEmpty(key) ? localStorage.clear() : localStorage.removeItem(key);
}
delete(key:any){
  delete this.data[ key ];
  this.store();
}
deleteAll(){
  this.data = {};
  this.store();
}
}
