import React from 'react'
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'

const ProductZoom = () => {

    return (
        <>
            <div className='whitespace-nowrap xl:flex xl:flex-col gap-4 w-full'>
                <InnerImageZoom zoomType="hover" zoomScales={1} src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a5e44b11-0b0a-4a8a-87bc-a3961bfeee0c/WMNS+AIR+JORDAN+1+LOW.png" />
                <InnerImageZoom zoomType="hover" zoomScales={1} src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a5e44b11-0b0a-4a8a-87bc-a3961bfeee0c/WMNS+AIR+JORDAN+1+LOW.png" />
                <InnerImageZoom zoomType="hover" zoomScales={1} src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a5e44b11-0b0a-4a8a-87bc-a3961bfeee0c/WMNS+AIR+JORDAN+1+LOW.png" />
                <InnerImageZoom zoomType="hover" zoomScales={1} src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a5e44b11-0b0a-4a8a-87bc-a3961bfeee0c/WMNS+AIR+JORDAN+1+LOW.png" />
            </div>
        </>
    )
}

export default ProductZoom;