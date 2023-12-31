/**
 * @fileoverview added by tsickle
 * Generated from: src/effect_sources.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { dematerialize, exhaustMap, filter, groupBy, map, mergeMap, take, } from 'rxjs/operators';
import { reportInvalidActions, } from './effect_notification';
import { mergeEffects } from './effects_resolver';
import { isOnIdentifyEffects, isOnRunEffects, isOnInitEffects, } from './lifecycle_hooks';
import { EFFECTS_ERROR_HANDLER } from './tokens';
import { getSourceForInstance } from './utils';
export class EffectSources extends Subject {
    /**
     * @param {?} errorHandler
     * @param {?} effectsErrorHandler
     */
    constructor(errorHandler, effectsErrorHandler) {
        super();
        this.errorHandler = errorHandler;
        this.effectsErrorHandler = effectsErrorHandler;
    }
    /**
     * @param {?} effectSourceInstance
     * @return {?}
     */
    addEffects(effectSourceInstance) {
        this.next(effectSourceInstance);
    }
    /**
     * \@internal
     * @return {?}
     */
    toActions() {
        return this.pipe(groupBy(getSourceForInstance), mergeMap((/**
         * @param {?} source$
         * @return {?}
         */
        (source$) => {
            return source$.pipe(groupBy(effectsInstance));
        })), mergeMap((/**
         * @param {?} source$
         * @return {?}
         */
        (source$) => {
            /** @type {?} */
            const effect$ = source$.pipe(exhaustMap((/**
             * @param {?} sourceInstance
             * @return {?}
             */
            (sourceInstance) => {
                return resolveEffectSource(this.errorHandler, this.effectsErrorHandler)(sourceInstance);
            })), map((/**
             * @param {?} output
             * @return {?}
             */
            (output) => {
                reportInvalidActions(output, this.errorHandler);
                return output.notification;
            })), filter((/**
             * @param {?} notification
             * @return {?}
             */
            (notification) => notification.kind === 'N' && notification.value != null)), dematerialize());
            // start the stream with an INIT action
            // do this only for the first Effect instance
            /** @type {?} */
            const init$ = source$.pipe(take(1), filter(isOnInitEffects), map((/**
             * @param {?} instance
             * @return {?}
             */
            (instance) => instance.ngrxOnInitEffects())));
            return merge(effect$, init$);
        })));
    }
}
EffectSources.decorators = [
    { type: Injectable }
];
/** @nocollapse */
EffectSources.ctorParameters = () => [
    { type: ErrorHandler },
    { type: undefined, decorators: [{ type: Inject, args: [EFFECTS_ERROR_HANDLER,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    EffectSources.prototype.errorHandler;
    /**
     * @type {?}
     * @private
     */
    EffectSources.prototype.effectsErrorHandler;
}
/**
 * @param {?} sourceInstance
 * @return {?}
 */
function effectsInstance(sourceInstance) {
    if (isOnIdentifyEffects(sourceInstance)) {
        return sourceInstance.ngrxOnIdentifyEffects();
    }
    return '';
}
/**
 * @param {?} errorHandler
 * @param {?} effectsErrorHandler
 * @return {?}
 */
function resolveEffectSource(errorHandler, effectsErrorHandler) {
    return (/**
     * @param {?} sourceInstance
     * @return {?}
     */
    (sourceInstance) => {
        /** @type {?} */
        const mergedEffects$ = mergeEffects(sourceInstance, errorHandler, effectsErrorHandler);
        if (isOnRunEffects(sourceInstance)) {
            return sourceInstance.ngrxOnRunEffects(mergedEffects$);
        }
        return mergedEffects$;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0X3NvdXJjZXMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vbW9kdWxlcy9lZmZlY3RzLyIsInNvdXJjZXMiOlsic3JjL2VmZmVjdF9zb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpFLE9BQU8sRUFBNEIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFVBQVUsRUFDVixNQUFNLEVBQ04sT0FBTyxFQUNQLEdBQUcsRUFDSCxRQUFRLEVBQ1IsSUFBSSxHQUNMLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUNMLG9CQUFvQixHQUVyQixNQUFNLHVCQUF1QixDQUFDO0FBRS9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBS0wsbUJBQW1CLEVBQ25CLGNBQWMsRUFDZCxlQUFlLEdBQ2hCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUcvQyxNQUFNLE9BQU8sYUFBYyxTQUFRLE9BQVk7Ozs7O0lBQzdDLFlBQ1UsWUFBMEIsRUFFMUIsbUJBQXdDO1FBRWhELEtBQUssRUFBRSxDQUFDO1FBSkEsaUJBQVksR0FBWixZQUFZLENBQWM7UUFFMUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtJQUdsRCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxvQkFBeUI7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBS0QsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FDZCxPQUFPLENBQUMsb0JBQW9CLENBQUMsRUFDN0IsUUFBUTs7OztRQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbkIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsRUFBQyxFQUNGLFFBQVE7Ozs7UUFBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOztrQkFDYixPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FDMUIsVUFBVTs7OztZQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7Z0JBQzVCLE9BQU8sbUJBQW1CLENBQ3hCLElBQUksQ0FBQyxZQUFZLEVBQ2pCLElBQUksQ0FBQyxtQkFBbUIsQ0FDekIsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNwQixDQUFDLEVBQUMsRUFDRixHQUFHOzs7O1lBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDYixvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDN0IsQ0FBQyxFQUFDLEVBQ0YsTUFBTTs7OztZQUNKLENBQ0UsWUFBWSxFQUlaLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxZQUFZLENBQUMsS0FBSyxJQUFJLElBQUksRUFDN0QsRUFDRCxhQUFhLEVBQUUsQ0FDaEI7Ozs7a0JBSUssS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQ3hCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQ3ZCLEdBQUc7Ozs7WUFBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEVBQUMsQ0FDaEQ7WUFFRCxPQUFPLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OztZQXpERixVQUFVOzs7O1lBL0JGLFlBQVk7NENBbUNoQixNQUFNLFNBQUMscUJBQXFCOzs7Ozs7O0lBRDdCLHFDQUFrQzs7Ozs7SUFDbEMsNENBQ2dEOzs7Ozs7QUF1RHBELFNBQVMsZUFBZSxDQUFDLGNBQW1CO0lBQzFDLElBQUksbUJBQW1CLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDdkMsT0FBTyxjQUFjLENBQUMscUJBQXFCLEVBQUUsQ0FBQztLQUMvQztJQUVELE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQzs7Ozs7O0FBRUQsU0FBUyxtQkFBbUIsQ0FDMUIsWUFBMEIsRUFDMUIsbUJBQXdDO0lBRXhDOzs7O0lBQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRTs7Y0FDbEIsY0FBYyxHQUFHLFlBQVksQ0FDakMsY0FBYyxFQUNkLFlBQVksRUFDWixtQkFBbUIsQ0FDcEI7UUFFRCxJQUFJLGNBQWMsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUNsQyxPQUFPLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUN4RDtRQUVELE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUMsRUFBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBtZXJnZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGVtYXRlcmlhbGl6ZSxcbiAgZXhoYXVzdE1hcCxcbiAgZmlsdGVyLFxuICBncm91cEJ5LFxuICBtYXAsXG4gIG1lcmdlTWFwLFxuICB0YWtlLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gIHJlcG9ydEludmFsaWRBY3Rpb25zLFxuICBFZmZlY3ROb3RpZmljYXRpb24sXG59IGZyb20gJy4vZWZmZWN0X25vdGlmaWNhdGlvbic7XG5pbXBvcnQgeyBFZmZlY3RzRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi9lZmZlY3RzX2Vycm9yX2hhbmRsZXInO1xuaW1wb3J0IHsgbWVyZ2VFZmZlY3RzIH0gZnJvbSAnLi9lZmZlY3RzX3Jlc29sdmVyJztcbmltcG9ydCB7XG4gIG9uSWRlbnRpZnlFZmZlY3RzS2V5LFxuICBvblJ1bkVmZmVjdHNLZXksXG4gIE9uUnVuRWZmZWN0cyxcbiAgb25Jbml0RWZmZWN0cyxcbiAgaXNPbklkZW50aWZ5RWZmZWN0cyxcbiAgaXNPblJ1bkVmZmVjdHMsXG4gIGlzT25Jbml0RWZmZWN0cyxcbn0gZnJvbSAnLi9saWZlY3ljbGVfaG9va3MnO1xuaW1wb3J0IHsgRUZGRUNUU19FUlJPUl9IQU5ETEVSIH0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHsgZ2V0U291cmNlRm9ySW5zdGFuY2UgfSBmcm9tICcuL3V0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVmZmVjdFNvdXJjZXMgZXh0ZW5kcyBTdWJqZWN0PGFueT4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyLFxuICAgIEBJbmplY3QoRUZGRUNUU19FUlJPUl9IQU5ETEVSKVxuICAgIHByaXZhdGUgZWZmZWN0c0Vycm9ySGFuZGxlcjogRWZmZWN0c0Vycm9ySGFuZGxlclxuICApIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgYWRkRWZmZWN0cyhlZmZlY3RTb3VyY2VJbnN0YW5jZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5uZXh0KGVmZmVjdFNvdXJjZUluc3RhbmNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHRvQWN0aW9ucygpOiBPYnNlcnZhYmxlPEFjdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnBpcGUoXG4gICAgICBncm91cEJ5KGdldFNvdXJjZUZvckluc3RhbmNlKSxcbiAgICAgIG1lcmdlTWFwKChzb3VyY2UkKSA9PiB7XG4gICAgICAgIHJldHVybiBzb3VyY2UkLnBpcGUoZ3JvdXBCeShlZmZlY3RzSW5zdGFuY2UpKTtcbiAgICAgIH0pLFxuICAgICAgbWVyZ2VNYXAoKHNvdXJjZSQpID0+IHtcbiAgICAgICAgY29uc3QgZWZmZWN0JCA9IHNvdXJjZSQucGlwZShcbiAgICAgICAgICBleGhhdXN0TWFwKChzb3VyY2VJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVFZmZlY3RTb3VyY2UoXG4gICAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyLFxuICAgICAgICAgICAgICB0aGlzLmVmZmVjdHNFcnJvckhhbmRsZXJcbiAgICAgICAgICAgICkoc291cmNlSW5zdGFuY2UpO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIG1hcCgob3V0cHV0KSA9PiB7XG4gICAgICAgICAgICByZXBvcnRJbnZhbGlkQWN0aW9ucyhvdXRwdXQsIHRoaXMuZXJyb3JIYW5kbGVyKTtcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQubm90aWZpY2F0aW9uO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgbm90aWZpY2F0aW9uXG4gICAgICAgICAgICApOiBub3RpZmljYXRpb24gaXMgTm90aWZpY2F0aW9uPEFjdGlvbj4gJiB7XG4gICAgICAgICAgICAgIGtpbmQ6ICdOJztcbiAgICAgICAgICAgICAgdmFsdWU6IEFjdGlvbjtcbiAgICAgICAgICAgIH0gPT4gbm90aWZpY2F0aW9uLmtpbmQgPT09ICdOJyAmJiBub3RpZmljYXRpb24udmFsdWUgIT0gbnVsbFxuICAgICAgICAgICksXG4gICAgICAgICAgZGVtYXRlcmlhbGl6ZSgpXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gc3RhcnQgdGhlIHN0cmVhbSB3aXRoIGFuIElOSVQgYWN0aW9uXG4gICAgICAgIC8vIGRvIHRoaXMgb25seSBmb3IgdGhlIGZpcnN0IEVmZmVjdCBpbnN0YW5jZVxuICAgICAgICBjb25zdCBpbml0JCA9IHNvdXJjZSQucGlwZShcbiAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgIGZpbHRlcihpc09uSW5pdEVmZmVjdHMpLFxuICAgICAgICAgIG1hcCgoaW5zdGFuY2UpID0+IGluc3RhbmNlLm5ncnhPbkluaXRFZmZlY3RzKCkpXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG1lcmdlKGVmZmVjdCQsIGluaXQkKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlZmZlY3RzSW5zdGFuY2Uoc291cmNlSW5zdGFuY2U6IGFueSkge1xuICBpZiAoaXNPbklkZW50aWZ5RWZmZWN0cyhzb3VyY2VJbnN0YW5jZSkpIHtcbiAgICByZXR1cm4gc291cmNlSW5zdGFuY2UubmdyeE9uSWRlbnRpZnlFZmZlY3RzKCk7XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVFZmZlY3RTb3VyY2UoXG4gIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyLFxuICBlZmZlY3RzRXJyb3JIYW5kbGVyOiBFZmZlY3RzRXJyb3JIYW5kbGVyXG4pOiAoc291cmNlSW5zdGFuY2U6IGFueSkgPT4gT2JzZXJ2YWJsZTxFZmZlY3ROb3RpZmljYXRpb24+IHtcbiAgcmV0dXJuIChzb3VyY2VJbnN0YW5jZSkgPT4ge1xuICAgIGNvbnN0IG1lcmdlZEVmZmVjdHMkID0gbWVyZ2VFZmZlY3RzKFxuICAgICAgc291cmNlSW5zdGFuY2UsXG4gICAgICBlcnJvckhhbmRsZXIsXG4gICAgICBlZmZlY3RzRXJyb3JIYW5kbGVyXG4gICAgKTtcblxuICAgIGlmIChpc09uUnVuRWZmZWN0cyhzb3VyY2VJbnN0YW5jZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2VJbnN0YW5jZS5uZ3J4T25SdW5FZmZlY3RzKG1lcmdlZEVmZmVjdHMkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVyZ2VkRWZmZWN0cyQ7XG4gIH07XG59XG4iXX0=