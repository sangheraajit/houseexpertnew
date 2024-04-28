import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggigInterceptor } from './loggig.interceptor';
import { NetworkInterceptor } from './network.interceptor';
import { NotifyInterceptor } from './notify.interptor';
import { TransformInterceptor } from './transform-response.interceptor';


/**
 *  Interceptors:
 *    Angular's interceptors flow in the order you provide them.
 *    If you provide interceptors A, then B, then C,
 *    then requests will flow in A->B->C and responses will flow out C->B->A.
 */
export const httpInterceptorProviders = [
  /**
   *  Log Http:
   *    This logs all HTTP traffic.
   *    Do this first so it can log the Http call happening in and out (last).
   */
  addInterceptor(LoggigInterceptor),
  /**
   * ReadOnly:
   *    This makes sure that HTTP POST, PUT and DELETE are not allowed if the
   *    user does not have permission. If they do not, then it cancels the request.
   *    Do this early, before we add headers, get busy, or execute the request.
   */
  //addInterceptor(ReadOnlyInterceptor),
  /**
   SSL:
   *    Ensure SSL by making calls that use http instead use https.
   */
  //addInterceptor(EnsureSSLInterceptor),
  /**
   * Auth:
   *    Add the authentication headers.
   */
  //addInterceptor(AuthInterceptor),
  /**
   * CSRF:
   *    Add the CSRF headers.
   */
  addInterceptor(NetworkInterceptor),
  /**
   *  Log headers:
   *    Log all headers.
   *    Must come after the headers are stuffed and before the request is made.
   */
  //addInterceptor(LogHeadersInterceptor),
  /**
   *  Busy:
   *    Enable and increment the count of HTTP requests, which can be used to show a busy indicator.
   *    Also decrement the count when responses are received, to eventually turn off the busy indicator.
   *    This must happen once it is certain a request will be made,
   *    and right after the response is received.
   */
  //addInterceptor(BusyInterceptor),
  /**
   * Transform Response:
   *    Transform the response, making it easier to consume.
   *    This could happen anywhere in this particular stream,
   *    as it operates on the response.
   */
  addInterceptor(TransformInterceptor),
  addInterceptor(NotifyInterceptor),
];

function addInterceptor<T>(interceptor: T) {
  return {
    provide: HTTP_INTERCEPTORS,
    useClass: interceptor,
    multi: true,
  };
}

/**
 * https://angular.io/guide/http#http-interceptors
 *
 * Why you care?
 * Have you ever needed to add headers to all or a subset of http requests? Transform the response? Log specific requests?
 * Without interception, developers would have to implement these tasks explicitly for each HttpClient method call.
 *
 * What is an interceptor?
 * HTTP Interception is a major feature of @angular/common/http.
 * With interception, you declare interceptors that inspect and transform HTTP requests from your application to the server.
 * The same interceptors may also inspect and transform the server's responses on their way back to the application.
 * Multiple interceptors form a forward-and-backward chain of request/response handlers.
 * Interceptors can perform a variety of implicit tasks, from authentication to logging, in a routine,
 * standard way, for every HTTP request/response.
 *
 * Providing Interceptors
 * Because interceptors are (optional) dependencies of the HttpClient service, you must provide them in the same injector
 * (or a parent of the injector) that provides HttpClient. Interceptors provided after DI creates the HttpClient are ignored.
 * Use a barrel and export an array of the interceptors.
 *
 * Modifying Requests
 *  Although interceptors are capable of mutating requests and responses, the HttpRequest and HttpResponse instance
 * properties are readonly, rendering them largely immutable.
 *  The request is immutable ... you must clone it.
 * Most interceptors transform the outgoing request before passing it to the next interceptor in the chain,
 * by calling next.handle(transformedReq). An interceptor may transform the response event stream as well,
 * by applying additional RxJS operators on the stream returned by next.handle().
 *
 * Modifing Responses
 * After you return stream via next.handle(), you can pipe the stream's response.
 * Use RxJS operators to transform or do what you will to it.
 * The response is immutable ... you must clone it.
 *
 * What is multi true?
 * The multi: true option is a required setting that tells Angular that HTTP_INTERCEPTORS is a token
 * for a multiprovider that injects an array of values, rather than a single value.
 *
 * Order is important
 * Angular applies interceptors in the order that you provide them. If you provide interceptors A,
 * then B, then C, requests will flow in A->B->C and responses will flow out C->B->A.



 */
