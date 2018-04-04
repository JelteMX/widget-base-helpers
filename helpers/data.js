import Deferred from 'dojo/Deferred';
import lang from 'dojo/_base/lang';

/**
 * Get Mendix data
 *
 * @param {Object} params Get parameters, see https://apidocs.mendix.com/7/client/mx.data.html#.get
 * @param {string} [params.guid]
 * @param {string[]} [params.guids]
 * @param {string} [params.xpath]
 * @param {string} [params.microflow]
 * @param {string} [params.path]
 * @param {boolean} [params.count]
 * @param {Object} [params.filter]
 * @param {string[]} [params.filter.attributes]
 * @param {number} [params.filter.offset]
 * @param {string[][]} [params.filter.sort]
 * @param {number} [params.filter.amount]
 * @param {boolean} [params.filter.distinct]
 * @param {Object} [params.filter.references]
 * @returns Promise
 */
export const getData = params => {
    const deferred = new Deferred();
    const getParams = lang.mixin({
        callback: deferred.resolve,
        error: deferred.reject,
    }, params);
    try {
        mx.data.get(getParams);
    } catch (e) {
        deferred.reject(e);
    }

    return deferred.promise;
};

/**
 * Fetch an attribute from a Mendix Object
 *
 * @param {Object} obj Mendix object
 * @param {string} attr Attribute
 * @returns Promise
 */
export const fetchAttr = (obj, attr) => {
    const deferred = new Deferred();
    try {
        obj.fetch(attr, val => deferred.resolve(val));
    } catch (e) {
        deferred.reject(e);
    }
    return deferred.promise;
};

/**
 * Commit, see https://apidocs.mendix.com/7/client/mx.data.html#.commit
 *
 * @param {Object} params
 * @param {Object} [params.mxobj]
 * @param {Object[]} [params.mxobjs]
 * @returns Promise
 */
export const commitData = params => {
    const deferred = new Deferred();
    const commitParams = lang.mixin({
        callback: deferred.resolve,
        error: deferred.reject,
    }, params);
    try {
        mx.data.commit(commitParams);
    } catch (e) {
        deferred.reject(e);
    }

    return deferred.promise;
};
