/* JAT: Java Astrodynamics Toolkit
 * 
  Copyright 2012 Tobias Berthold

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

package jat.examples.TwoBodyExample;

import jat.core.cm.TwoBodyAPL;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.math3.ode.FirstOrderIntegrator;
import org.apache.commons.math3.ode.nonstiff.DormandPrince853Integrator;

public class TwoBodyText {

	public TwoBodyText() {
	}

	public static void main(String[] args) {
		double a = 7000.0; // sma in km
		double e = 0.3; // eccentricity
		double inc = 0.; // inclination in radians
		double raan = 0.; // right ascension of ascending node in radians
		double w = 0.; // argument of perigee in radians
		double ta = 0.; // true anomaly in radians

		// create a TwoBody orbit using orbit elements
		TwoBodyAPL sat = new TwoBodyAPL(a, e, inc, raan, w, ta);

		double[] y = sat.randv();

		// propagate the orbit
		FirstOrderIntegrator dp853 = new DormandPrince853Integrator(1.0e-8,
				100.0, 1.0e-10, 1.0e-10);
		dp853.addStepHandler(sat.stepHandler);
		// double[] y = new double[] { 7000.0, 0, 0, .0, 8, 0 }; // initial
		// state

		dp853.integrate(sat, 0.0, y, 8000, y); // now y contains final state at
												// tf

		Double[] objArray = sat.time.toArray(new Double[sat.time.size()]);
		double[] timeArray = ArrayUtils.toPrimitive(objArray);
		double[] xsolArray = ArrayUtils.toPrimitive(sat.xsol
				.toArray(new Double[sat.time.size()]));
		double[] ysolArray = ArrayUtils.toPrimitive(sat.ysol
				.toArray(new Double[sat.time.size()]));

		double[][] XY = new double[timeArray.length][2];

		for (int i = 0; i < timeArray.length; i++) {
			XY[i][0] = xsolArray[i];
			XY[i][1] = ysolArray[i];
			System.out.println(XY[i][0] + " " + XY[i][1]);
		}

		System.out.println("end");

	}
}
