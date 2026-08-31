
import TsIndex from '../typescript/index'

// include ts in dom elements
const tsRoot = document.getElementById('ts_root')
if (tsRoot) {
    tsRoot.appendChild(TsIndex())
  
}
