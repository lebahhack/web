const memory=new Map();

export async function cacheFetch(
key,
callback,
ttl=300
){

const now=Date.now();

const cached=memory.get(key);

if(
cached &&
cached.expire>now
){
return cached.data;
}

const data=await callback();

memory.set(key,{
data,
expire:now+(ttl*1000)
});

return data;

}

export function clearCache(key){

if(key){
memory.delete(key);
return;
}

memory.clear();

}

export function getCache(key){

const cached=memory.get(key);

if(!cached){
return null;
}

if(cached.expire<Date.now()){
memory.delete(key);
return null;
}

return cached.data;

}
