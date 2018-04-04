/*eslint no-invalid-this: 0*/
import lang from 'dojo/_base/lang';
import {log} from './index';
import Deferred from 'dojo/Deferred';

/**
 * Run a microflow
 *
 * @param {string} microflow Microflow name
 * @param {string|null} guid GUID of the Mendix Object that is passed to the microflow
 * @param {Function} [cb] callback function
 * @param {Function} [errCb] error function
 * @returns void
 */
export function execute(microflow, guid, cb, errCb) {
    if (microflow) {
        log.call(this, 'execute microflow', 'mf: ' + microflow + ':' + guid);
        const action = {
            params: {
                actionname: microflow,
                applyto: 'selection',
                guids: [],
            },
            callback: lang.hitch(this, res => {
                if (cb && 'function' == typeof cb) {
                    cb(res);
                }
            }),
            error: lang.hitch(this, error => {
                if (errCb && 'function' == typeof errCb) {
                    errCb(error);
                } else {
                    mx.ui.error('Error executing microflow ' + microflow + ' : ' + error.message);
                    console.error(this.id + '._execMf', error);
                }
            }),
        };

        if (guid) {
            action.params.guids = [guid];
        }

        if (!mx.version || mx.version && 7 > parseInt(mx.version.split('.')[ 0 ], 10)) {
            action.store = {
                caller: this.mxform,
            };
        } else {
            action.origin = this.mxform;
        }

        mx.data.action(action, this);
    }
}

/**
 * Run a microflow as a promise
 *
 * @param {string} microflow Microflow name
 * @param {string} [guid] Guid of Mendix object that is passed to the microflow
 * @returns Promise
 */
export function executePromise(microflow, guid) {
    const deferred = new Deferred();

    execute.call(this, microflow, guid, deferred.resolve, deferred.reject);

    return deferred.promise;
}
