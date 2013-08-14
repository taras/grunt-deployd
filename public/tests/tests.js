asyncTest( "widgets api endpoint", function () {
  expect( 1 );
  $.ajax( {
    url : '/api/widgets',
    statusCode : {
      404 : function () {
        ok( false, "Returned error 404" );
        start();
      }
    }
  } )
    .done( function ( data ) {
      ok( true, "Callback executed successfully" );
      start();
    } );
} );

test( "dpd widgets object", function() {
  ok( dpd.hasOwnProperty( 'widgets' ), "Expect to have access to widgets object." );
});