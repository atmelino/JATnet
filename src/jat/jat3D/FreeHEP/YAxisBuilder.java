package jat.jat3D.FreeHEP;
import javax.media.j3d.Node;
import javax.media.j3d.Transform3D;
import javax.media.j3d.TransformGroup;
import javax.vecmath.Vector3f;

/**
 * @author Joy Kyriakopulos (joyk@fnal.gov)
 * @version $Id: YAxisBuilder.java 8584 2006-08-10 23:06:37Z duns $
 */
public class YAxisBuilder extends AxisBuilder
{	

	public YAxisBuilder()
	{
	}
	public YAxisBuilder(String label, String[] tickLabels, double[] tickLocations)
	{
		setLabel(label);
		setTickLabels(tickLabels);
		setTickLocations(tickLocations);
	}
	public Node getNode()
	{
		Transform3D t3d = new Transform3D();
		t3d.set(1/scale,new Vector3f(lo,-hi,lo));
		Transform3D rot = new Transform3D();
		rot.rotZ(Math.PI/2);
		t3d.mul(rot);
		TransformGroup tg = new TransformGroup(t3d);
		tg.addChild(super.getNode());
		return tg;		
	}
}
