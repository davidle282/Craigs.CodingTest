import React from 'react';
import { Box, Button, Link , Card, CardMedia, CardContent, CardActions, Typography } from "@material-ui/core";
import {Product} from "../_interfaces/product";

interface IProps {
    product: Product,
    onSelect: () => void;
    
}

function ProductItem({product, onSelect}: IProps)  {

    return (
        <Card style={{ height: "100%" }}>
            <CardContent>
                <Link onClick = {onSelect} style={{cursor:'pointer', textDecorationLine:'none'}}>
                    <CardMedia>
                        <img 
                            src="https://cdn.shopify.com/s/files/1/2318/5263/products/BMT10828_BJ_01_29459064-0a4c-4fcb-b41c-3eda861e5bd7_800x800.jpg?v=1604167910"
                            style={{width:'70%', marginRight:'auto', marginLeft:'auto', display:'flex'}}
                        />
                    </CardMedia>
                    <Typography color="primary" gutterBottom variant="h6" component="h6">
                        {product.productName}
                    </Typography>
                </Link>
                <Box display="flex" style={{justifyContent:'space-between'}} >
                    <Typography color="secondary">{product?.brand?.brandName}</Typography>
                    <Typography color="textSecondary" style={{alignSelf: 'flex-end'}}>{product?.category?.categoryName}</Typography>
                </Box>
            </CardContent>
            <CardActions style={{justifyContent:'space-between'}}>
                <Typography style={{marginLeft:8}} color="secondary">${product?.listPrice}</Typography>
                <Button size="medium" variant='outlined' color="primary" style={{alignSelf: 'flex-end'}} onClick = {onSelect}>
                    More Details
                </Button> 
            </CardActions>
        </Card>
    )

}

export default ProductItem
