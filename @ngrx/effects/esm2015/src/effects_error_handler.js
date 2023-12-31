/**
 * @fileoverview added by tsickle
 * Generated from: src/effects_error_handler.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { catchError } from 'rxjs/operators';
/** @type {?} */
const MAX_NUMBER_OF_RETRY_ATTEMPTS = 10;
/**
 * @template T
 * @param {?} observable$
 * @param {?} errorHandler
 * @param {?=} retryAttemptLeft
 * @return {?}
 */
export function defaultEffectsErrorHandler(observable$, errorHandler, retryAttemptLeft = MAX_NUMBER_OF_RETRY_ATTEMPTS) {
    return observable$.pipe(catchError((/**
     * @param {?} error
     * @return {?}
     */
    (error) => {
        if (errorHandler)
            errorHandler.handleError(error);
        if (retryAttemptLeft <= 1) {
            return observable$; // last attempt
        }
        // Return observable that produces this particular effect
        return defaultEffectsErrorHandler(observable$, errorHandler, retryAttemptLeft - 1);
    })));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19lcnJvcl9oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy8iLCJzb3VyY2VzIjpbInNyYy9lZmZlY3RzX2Vycm9yX2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O01BT3RDLDRCQUE0QixHQUFHLEVBQUU7Ozs7Ozs7O0FBRXZDLE1BQU0sVUFBVSwwQkFBMEIsQ0FDeEMsV0FBMEIsRUFDMUIsWUFBMEIsRUFDMUIsbUJBQTJCLDRCQUE0QjtJQUV2RCxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQ3JCLFVBQVU7Ozs7SUFBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ25CLElBQUksWUFBWTtZQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsSUFBSSxnQkFBZ0IsSUFBSSxDQUFDLEVBQUU7WUFDekIsT0FBTyxXQUFXLENBQUMsQ0FBQyxlQUFlO1NBQ3BDO1FBQ0QseURBQXlEO1FBQ3pELE9BQU8sMEJBQTBCLENBQy9CLFdBQVcsRUFDWCxZQUFZLEVBQ1osZ0JBQWdCLEdBQUcsQ0FBQyxDQUNyQixDQUFDO0lBQ0osQ0FBQyxFQUFDLENBQ0gsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvckhhbmRsZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCB0eXBlIEVmZmVjdHNFcnJvckhhbmRsZXIgPSA8VCBleHRlbmRzIEFjdGlvbj4oXG4gIG9ic2VydmFibGUkOiBPYnNlcnZhYmxlPFQ+LFxuICBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlclxuKSA9PiBPYnNlcnZhYmxlPFQ+O1xuXG5jb25zdCBNQVhfTlVNQkVSX09GX1JFVFJZX0FUVEVNUFRTID0gMTA7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0RWZmZWN0c0Vycm9ySGFuZGxlcjxUIGV4dGVuZHMgQWN0aW9uPihcbiAgb2JzZXJ2YWJsZSQ6IE9ic2VydmFibGU8VD4sXG4gIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyLFxuICByZXRyeUF0dGVtcHRMZWZ0OiBudW1iZXIgPSBNQVhfTlVNQkVSX09GX1JFVFJZX0FUVEVNUFRTXG4pOiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIG9ic2VydmFibGUkLnBpcGUoXG4gICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvckhhbmRsZXIpIGVycm9ySGFuZGxlci5oYW5kbGVFcnJvcihlcnJvcik7XG4gICAgICBpZiAocmV0cnlBdHRlbXB0TGVmdCA8PSAxKSB7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlJDsgLy8gbGFzdCBhdHRlbXB0XG4gICAgICB9XG4gICAgICAvLyBSZXR1cm4gb2JzZXJ2YWJsZSB0aGF0IHByb2R1Y2VzIHRoaXMgcGFydGljdWxhciBlZmZlY3RcbiAgICAgIHJldHVybiBkZWZhdWx0RWZmZWN0c0Vycm9ySGFuZGxlcihcbiAgICAgICAgb2JzZXJ2YWJsZSQsXG4gICAgICAgIGVycm9ySGFuZGxlcixcbiAgICAgICAgcmV0cnlBdHRlbXB0TGVmdCAtIDFcbiAgICAgICk7XG4gICAgfSlcbiAgKTtcbn1cbiJdfQ==