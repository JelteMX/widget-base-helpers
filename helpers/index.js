/*eslint no-invalid-this: 0*/
import Deferred from 'dojo/Deferred';

/**
 * Logs using the Mendix logger
 *
 * @export
 * @param {string} methodName
 * @param {...any} args
 */
export function log() {
    const methodName = arguments[ 0 ];
    const args = Array.prototype.slice.call(arguments, 1);
    if (this.id) {
        logger.debug(this.id + '.' + methodName, args && args.length ? args[ 0 ] : '');
    } else {
        logger.debug(methodName, args && args.length ? args[ 0 ] : '');
    }
}

/**
 * Runs a callback and logs the method where it comes from
 *
 * @export
 * @param {() => {}} cb
 * @param {string} from
 */
export function runCallback(cb, from) {
    log.call(this, '_callback', from ? 'from ' + from : '');
    if (cb && 'function' === typeof cb) {
        cb();
    }
}

export const getMendixVersion = () => {
    const deferred = new Deferred();

    if (!mx.version) {
        deferred.resolve(null);
    } else {
        try {
            const version = mx.version.split('.');
            const versionObject = {
                major: parseInt(version[ 0 ], 10),
                minor: parseInt(version[ 1 ], 10),
                path: parseInt(version[ 2 ], 10)
            };
            deferred.resolve(versionObject);
        } catch (error) {
            console.warn('getMendixVersion error:', error);
            deferred.resolve(null);
        }
    }

    return deferred.promise;
};
