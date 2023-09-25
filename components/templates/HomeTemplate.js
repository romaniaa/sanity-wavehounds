/*
    This is the fallback template for the home page if none is set in site settings
 */
    export default function HomeTemplate() {
      return (
  
          <div className={'mt-80 laptop:mt-100 container-wide'}>
              <h1>Home</h1>
              <p>
                  Default home template.
              </p>
          </div>
      )
  }